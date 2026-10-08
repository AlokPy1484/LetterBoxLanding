"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import styles from "./demo-video-player.module.css";

const DEMO_VIDEO_URL = "/Demo.mp4?v=centered-20261008";
const DEMO_POSTER_URL = "/demo-poster.jpg?v=centered-20261008";

export default function DemoVideoPlayer() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    function openDemo() {
        setIsLoading(true);
        setHasError(false);
        setIsOpen(true);
        dialogRef.current?.showModal();
    }

    function closeDemo() {
        videoRef.current?.pause();
        dialogRef.current?.close();
    }

    return (
        <>
            <button
                type="button"
                onClick={openDemo}
                aria-haspopup="dialog"
                className="flex justify-center px-5 py-2.5 rounded-[20px] border border-[var(--lofi-border)] text-[var(--lofi-text-muted)] hover:bg-[var(--lofi-accent-soft)]/30 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lofi-accent)]"
            >
                Watch Demo
            </button>

            <dialog
                ref={dialogRef}
                className={styles.dialog}
                aria-labelledby="demo-video-title"
                aria-describedby="demo-video-description"
                onClose={() => {
                    videoRef.current?.pause();
                    setIsOpen(false);
                }}
                onClick={(event) => {
                    if (event.target !== event.currentTarget) return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    if (event.clientX < bounds.left || event.clientX > bounds.right ||
                        event.clientY < bounds.top || event.clientY > bounds.bottom) {
                        closeDemo();
                    }
                }}
            >
                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>A LITTLE THOUGHT. A LASTING FEELING.</p>
                        <h2 id="demo-video-title" className={styles.title}>See LetterBox in action</h2>
                    </div>
                    <button
                        type="button"
                        aria-label="Close demo video"
                        className={styles.close}
                        onClick={closeDemo}
                        autoFocus
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </header>

                <div className={styles.screen}>
                    {isOpen && (
                        <video
                            ref={videoRef}
                            className={styles.video}
                            src={DEMO_VIDEO_URL}
                            poster={DEMO_POSTER_URL}
                            controls
                            autoPlay
                            playsInline
                            preload="metadata"
                            aria-label="LetterBox product demo"
                            onLoadedData={() => setIsLoading(false)}
                            onError={() => {
                                setIsLoading(false);
                                setHasError(true);
                            }}
                        >
                            Your browser does not support embedded video.
                            <a href={DEMO_VIDEO_URL}>Open the LetterBox demo</a>.
                        </video>
                    )}
                    {isOpen && isLoading && !hasError && (
                        <div className={styles.loading} role="status">
                            <span className={styles.spinner} aria-hidden="true" />
                            <span>Loading your demo…</span>
                        </div>
                    )}
                    {hasError && (
                        <div className={styles.error} role="alert">
                            <p>The video couldn’t load.</p>
                            <a href={DEMO_VIDEO_URL} target="_blank" rel="noreferrer">Open the demo directly ↗</a>
                        </div>
                    )}
                </div>

                <p id="demo-video-description" className={styles.description}>
                    From a thought to a letter they’ll treasure.
                </p>
            </dialog>
        </>
    );
}
