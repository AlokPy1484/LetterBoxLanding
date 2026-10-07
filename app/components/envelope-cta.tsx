import styles from "./envelope-cta.module.css";

export default function EnvelopeCta() {
    return (
        <button type="button" className={styles.button}>
            <span className={styles.icon} aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M3 12L16 4L29 12V27H3Z" fill="var(--lofi-accent)" stroke="currentColor" />
                    <rect className={styles.letter} x="7" y="12" width="18" height="13" rx="1" fill="var(--lofi-bg)" />
                    <path d="M3 12L16 21L29 12V27H3Z" fill="var(--lofi-accent-soft)" stroke="currentColor" strokeLinejoin="round" />
                    <path className={styles.flap} d="M3 12L16 21L29 12Z" fill="var(--lofi-accent-soft)" stroke="currentColor" strokeLinejoin="round" />
                </svg>
            </span>
            <span>Start writing a letter</span>
        </button>
    );
}
