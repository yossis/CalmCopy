import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>CalmCopy</h1>
        <p className={styles.subtitle}>Internal Content Assistant</p>
        <Link href="/login" className={styles.button}>
          Get Started
        </Link>
      </div>
    </main>
  );
}
