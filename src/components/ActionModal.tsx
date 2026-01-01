"use client";

import { useState, useEffect } from "react";
import styles from "./ActionModal.module.css";

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDone: () => void;
    content: string;
    audience: string;
}

const CHANNELS_BY_AUDIENCE: Record<string, string[]> = {
    "Employees": ["Slack", "Email", "HiBob", "Microsoft Teams"],
    "Existing Customers": ["Email", "Intercom", "Zendesk", "In-App Notification"],
    "New Leads": ["LinkedIn", "Facebook", "Twitter / X", "Instagram"],
    "General Public": ["LinkedIn", "Facebook", "Twitter / X", "Medium"],
    "Investors": ["Email", "Investor Portal", "LinkedIn"],
};

const DEFAULT_CHANNELS = ["Email", "Slack", "LinkedIn"];

export default function ActionModal({ isOpen, onClose, onDone, content, audience }: ActionModalProps) {
    const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsSending(false);
            setIsSent(false);
            setSelectedChannels([]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const availableChannels = CHANNELS_BY_AUDIENCE[audience] || DEFAULT_CHANNELS;

    const toggleChannel = (channel: string) => {
        if (selectedChannels.includes(channel)) {
            setSelectedChannels(selectedChannels.filter(c => c !== channel));
        } else {
            setSelectedChannels([...selectedChannels, channel]);
        }
    };

    const handleSend = () => {
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);
        }, 4000); // 4 seconds delay
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeButton}>&times;</button>

                {isSending ? (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner}>🍋</div>
                        <p className={styles.loadingText}>Squeezing the lemons...</p>
                    </div>
                ) : isSent ? (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>🎉</div>
                        <h2 className={styles.successTitle}>Sent!</h2>
                        <p className={styles.successText}>
                            Your content has been distributed to: <br />
                            <strong>{selectedChannels.join(", ")}</strong>
                        </p>
                        <button onClick={onDone} className={styles.primaryButton}>Done</button>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.title}>Use this Result</h2>

                        <div className={styles.previewSection}>
                            <label className={styles.label}>Content Preview</label>
                            <div className={styles.previewBox}>{content}</div>
                        </div>

                        <div className={styles.channelsSection}>
                            <label className={styles.label}>Where should we send this?</label>
                            <p className={styles.subLabel}>Suggested for <strong>{audience}</strong>:</p>

                            <div className={styles.grid}>
                                {availableChannels.map(channel => (
                                    <button
                                        key={channel}
                                        onClick={() => toggleChannel(channel)}
                                        className={`${styles.channelButton} ${selectedChannels.includes(channel) ? styles.selected : ""}`}
                                    >
                                        {channel}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <button onClick={onClose} className={styles.secondaryButton}>Cancel</button>
                            <button
                                onClick={handleSend}
                                disabled={selectedChannels.length === 0}
                                className={styles.primaryButton}
                            >
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
