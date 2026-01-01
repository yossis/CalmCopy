"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "demo" && password === "demo") {
            // In a real app, we'd set a cookie or token here.
            // For MVP, we just redirect.
            localStorage.setItem("lemonade_user", username);
            router.push("/wizard");
        } else {
            setError("Invalid credentials. Try demo / demo");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to CalmCopy</p>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="Enter password"
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
