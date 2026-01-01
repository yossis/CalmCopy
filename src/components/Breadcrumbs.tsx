"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/") return null;

    const pathSegments = pathname.split("/").filter((segment) => segment);

    return (
        <div className={styles.breadcrumbs}>
            <Link href="/wizard" className={styles.link}>Home</Link>
            {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;
                const label = segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                    <span key={href} className={styles.segment}>
                        <span className={styles.separator}>/</span>
                        {isLast ? (
                            <span className={styles.current}>{label}</span>
                        ) : (
                            <Link href={href} className={styles.link}>
                                {label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </div>
    );
}
