"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getLaunchCountdown, LAUNCH_LABEL } from "../lib/launch-countdown";

type LaunchCountdownButtonProps = {
    label: string;
    className?: string;
    icon?: ReactNode;
};

export default function LaunchCountdownButton({ label, className, icon }: LaunchCountdownButtonProps) {
    const [countdown, setCountdown] = useState<ReturnType<typeof getLaunchCountdown> | null>(null);
    const started = countdown !== null;
    const expired = countdown?.expired ?? false;

    useEffect(() => {
        if (!started || expired) return;
        const interval = window.setInterval(() => setCountdown(getLaunchCountdown()), 1000);
        return () => window.clearInterval(interval);
    }, [started, expired]);

    return (
        <button
            type="button"
            className={className}
            title={`Opens ${LAUNCH_LABEL}`}
            onClick={() => setCountdown(getLaunchCountdown())}
        >
            {icon}
            <span className="flex flex-col items-center justify-center">
                {countdown ? (
                    countdown.expired ? (
                        <span>Countdown complete</span>
                    ) : (
                        <>
                            <span className="text-[10px] leading-4 text-[var(--lofi-text-muted)]">Opens Sunday · 9 AM IST</span>
                            <span role="timer" aria-live="off" className="whitespace-nowrap font-mono text-[13px] leading-5 tabular-nums">
                                {countdown.text}
                            </span>
                        </>
                    )
                ) : label}
            </span>
            <span className="sr-only" role="status">
                {countdown ? (countdown.expired ? "The countdown is complete." : `Countdown started. Opens ${LAUNCH_LABEL}.`) : ""}
            </span>
        </button>
    );
}
