"use client";

import { useState } from "react";
import { useSession } from "@/context/SessionContext";
import styles from "./ContextEditorModal.module.css";

interface ContextEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OPTIONS = {
    segment: [
        "Internal comms",
        "External comms / PR",
        "Emails sent to customers",
        "Creative marketing copy",
        "Product micro-copy"
    ],
    tone: ["Friendly & Warm", "Professional & Clear", "Playful & Witty", "Empathetic & Calm"],
    audience: ["Existing Customers", "New Leads", "Employees", "General Public"],
};

export default function ContextEditorModal({ isOpen, onClose }: ContextEditorModalProps) {
    const { segment, setSegment, tone, setTone, audience, setAudience } = useSession();

    // Local state for edits before saving
    const [tempSegment, setTempSegment] = useState(segment);
    const [tempTone, setTempTone] = useState(tone);
    const [tempAudience, setTempAudience] = useState(audience);

    if (!isOpen) return null;

    const handleSave = () => {
        setSegment(tempSegment);
        setTone(tempTone);
        setAudience(tempAudience);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Edit Context</h2>
                    <button onClick={onClose} className={styles.closeButton}>&times;</button>
                </div>

                <div className={styles.body}>
                    <div className={styles.field}>
                        <label className={styles.label}>Segment</label>
                        <select
                            value={tempSegment}
                            onChange={(e) => setTempSegment(e.target.value)}
                            className={styles.select}
                        >
                            {OPTIONS.segment.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Tone</label>
                        <select
                            value={tempTone}
                            onChange={(e) => setTempTone(e.target.value)}
                            className={styles.select}
                        >
                            {OPTIONS.tone.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Audience</label>
                        <select
                            value={tempAudience}
                            onChange={(e) => setTempAudience(e.target.value)}
                            className={styles.select}
                        >
                            {OPTIONS.audience.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    <button onClick={handleSave} className={styles.saveButton}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}
