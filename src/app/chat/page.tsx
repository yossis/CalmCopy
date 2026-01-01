"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import { useSettings } from "@/context/SettingsContext";
import ContextEditorModal from "@/components/ContextEditorModal";
import ActionModal from "@/components/ActionModal";
import styles from "./page.module.css";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
}

export default function ChatPage() {
    const { segment, tone, audience, isComplete } = useSession();
    const { apiKey, isMockMode } = useSettings();
    const router = useRouter();

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isComplete) {
            router.push("/wizard");
        } else {
            // Initial greeting or Context Update
            // We update the 'init' message if it exists, or create it if no messages exist.
            const getGreeting = () => {
                const base = `Hi! I'm here to help you write ${tone.toLowerCase()} content for ${audience}.`;

                if (segment === "Product micro-copy") {
                    return `Hi! I’m here to help you write clear, ${tone.toLowerCase()} product micro-copy for ${audience}. Whether it’s error messages, empty states, confirmations, or short guidance texts, I can help you phrase things in a way that feels human, reassuring, and easy to understand. What would you like to write?`;
                }
                if (segment === "Internal comms") {
                    return `Hi! Need to send an update to the team? I can help you draft ${tone.toLowerCase()} Slack announcements, policy updates, or Q&A replies for ${audience}. What's on your mind?`;
                }
                if (segment === "External comms / PR") {
                    return `Hello! Let's craft some compelling ${tone.toLowerCase()} PR content for ${audience}. Whether it's a press release, blog post, or investor note, I'm ready. What are we announcing?`;
                }
                if (segment === "Emails sent to customers") {
                    return `Hi! I can help you write effective ${tone.toLowerCase()} emails for ${audience}. Transactional or marketing, let's make sure it lands well. What's the subject?`;
                }
                if (segment === "Creative marketing copy") {
                    return `Hey! Ready to write some catchy ${tone.toLowerCase()} marketing copy for ${audience}? Ads, captions, or headers—let's make it pop. What's the campaign about?`;
                }

                return `Hi! I'm ready to help you write ${tone.toLowerCase()} content for ${segment} targeting ${audience}. What do you need?`;
            };

            setMessages(prevMessages => {
                if (prevMessages.length === 0) {
                    return [{ id: "init", role: "ai", content: getGreeting() }];
                }
                // If the first message is the init message, update it
                if (prevMessages[0].id === "init") {
                    const newMessages = [...prevMessages];
                    newMessages[0] = { ...newMessages[0], content: getGreeting() };
                    return newMessages;
                }
                return prevMessages;
            });
        }
    }, [isComplete, router, segment, tone, audience]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    context: { segment, tone, audience },
                    prompt: input,
                    apiKey,
                    mock: isMockMode,
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", content: data.content };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "Sorry, I encountered an error. Please check your settings or try again."
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.contextPills}>
                    <span className={styles.pill}>{segment}</span>
                    <span className={styles.pill}>{tone}</span>
                    <span className={styles.pill}>{audience}</span>
                </div>
                <button onClick={() => setIsModalOpen(true)} className={styles.editButton}>
                    Edit Context
                </button>
            </header>

            <ContextEditorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <ActionModal
                isOpen={actionModalOpen}
                onClose={() => setActionModalOpen(false)}
                onDone={() => {
                    setActionModalOpen(false);
                    router.push("/wizard");
                }}
                content={selectedContent}
                audience={audience}
            />

            <div className={styles.chatArea}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.message} ${styles[msg.role]}`}>
                        <div className={styles.bubble}>
                            {msg.content}
                        </div>
                        {msg.role === "ai" && (
                            <div className={styles.actions}>
                                {msg.id !== "init" && (
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => navigator.clipboard.writeText(msg.content)}
                                    >
                                        Copy Text
                                    </button>
                                )}
                                {msg.id !== "init" && (
                                    <button
                                        className={`${styles.actionButton} ${styles.useResultButton}`}
                                        onClick={() => {
                                            setSelectedContent(msg.content);
                                            setActionModalOpen(true);
                                        }}
                                    >
                                        I'm happy!
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className={`${styles.message} ${styles.ai}`}>
                        <div className={styles.bubble}>
                            <span className={styles.typing}>...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className={styles.inputArea}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe what you want to write..."
                        className={styles.input}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className={styles.sendButton}>
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
