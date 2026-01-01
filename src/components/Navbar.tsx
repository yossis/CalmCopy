"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const pathname = usePathname();

    // Don't show navbar on login page
    if (pathname === "/login" || pathname === "/") return null;

    // Simple user initial retrieval (client-side only for MVP)
    const userInitial = typeof window !== "undefined" ? localStorage.getItem("lemonade_user")?.charAt(0).toUpperCase() || "D" : "D";

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/wizard" className={styles.brandLink}>
                    <span className={styles.brandName}>CalmCopy</span>
                    <span className={styles.brandSlogan}>powered by Lemonade</span>
                </Link>
            </div>
            <div className={styles.links}>
                <Link href="/wizard" className={pathname === "/wizard" ? styles.active : ""}>
                    New Write
                </Link>
                <Link href="/settings" className={pathname === "/settings" ? styles.active : ""}>
                    Settings
                </Link>
                <div className={styles.userProfile}>
                    <div className={styles.avatar}>{userInitial}</div>
                    <Link href="/login" className={styles.logout}>
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
}
