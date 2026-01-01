"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import styles from "./page.module.css";

const STEPS = [
    {
        id: "segment",
        question: "What are you writing for?",
        options: [
            "Internal comms",
            "External comms / PR",
            "Emails sent to customers",
            "Creative marketing copy",
            "Product micro-copy"
        ],
    },
    {
        id: "tone",
        question: "How should it sound?",
        options: ["Friendly & Warm", "Professional & Clear", "Playful & Witty", "Empathetic & Calm"],
    },
    {
        id: "audience",
        question: "Who is this for?",
        options: ["Existing Customers", "New Leads", "Employees", "General Public"],
    },
];

export default function WizardPage() {
    const { setSegment, setTone, setAudience, isComplete } = useSession();
    const router = useRouter();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Auto-redirect removed to allow "Edit Context"


    const handleSelect = (option: string) => {
        const stepId = STEPS[currentStepIndex].id;

        if (stepId === "segment") setSegment(option);
        if (stepId === "tone") setTone(option);
        if (stepId === "audience") setAudience(option);

        if (currentStepIndex < STEPS.length - 1) {
            setTimeout(() => setCurrentStepIndex(currentStepIndex + 1), 300);
        } else {
            setTimeout(() => router.push("/chat"), 300);
        }
    };

    const currentStep = STEPS[currentStepIndex];
    const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.card}>
                <span className={styles.stepLabel}>Step {currentStepIndex + 1} of {STEPS.length}</span>
                <h1 className={styles.question}>{currentStep.question}</h1>

                <div className={styles.optionsGrid}>
                    {currentStep.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={styles.optionButton}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
