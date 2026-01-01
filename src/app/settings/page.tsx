"use client";

import { useSettings } from "@/context/SettingsContext";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function SettingsPage() {
    const { apiKey, setApiKey, isMockMode, setIsMockMode } = useSettings();
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Settings</h1>
                <p className={styles.subtitle}>Configure AI Provider</p>

                <div className={styles.section}>
                    <label className={styles.label}>Gemini API Key</label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className={styles.input}
                        placeholder="sk-..."
                    />
                    <p className={styles.hint}>
                        Your key is stored locally in your browser.
                    </p>
                </div>

                <div className={styles.section}>
                    <div className={styles.toggleRow}>
                        <label className={styles.label}>Mock Mode</label>
                        <button
                            onClick={() => setIsMockMode(!isMockMode)}
                            className={`${styles.toggle} ${isMockMode ? styles.active : ""}`}
                        >
                            <div className={styles.knob} />
                        </button>
                    </div>
                    <p className={styles.hint}>
                        {isMockMode
                            ? "Using simulated responses (Free, Fast)."
                            : "Using Google Gemini (gemini-flash-latest). If no key is entered above, the server environment variable will be used."}
                    </p>
                </div>

                <div className={styles.actions}>
                    <button onClick={() => router.push("/wizard")} className={styles.button}>
                        Save & Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
