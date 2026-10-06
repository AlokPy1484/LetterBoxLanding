"use client";

import styles from "./hero-scroll-cue.module.css";

export default function HeroScrollCue() {
    function scrollToWalkthrough() {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("about")?.scrollIntoView({
            behavior: reducedMotion ? "instant" : "smooth",
            block: "start",
        });
    }

    return (
        <button
            type="button"
            onClick={scrollToWalkthrough}
            aria-label="A little further… Scroll to walkthrough 01"
            className={styles.cue}
        >
            <span>A little further…</span>
            <span className={styles.arrowHover}>
                <svg
                    className={styles.arrow}
                    width="32"
                    height="48"
                    viewBox="0 0 28 42"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M7 3C18 5 23 13 20 21C18 27 12 29 13 37M6 30C8 33 11 35 13 38C16 35 19 33 23 31"
                        stroke="currentColor"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </button>
    );
}
