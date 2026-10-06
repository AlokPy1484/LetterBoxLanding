"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealDirection = "up" | "left" | "right" | "scale" | "stamp" | "left-scale" | "right-scale";

type RevealOnViewProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: RevealDirection;
};

export default function RevealOnView({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: RevealOnViewProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<"pending" | "hidden" | "visible">("pending");

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setState("visible");
            return;
        }

        let animationFrame = 0;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) {
                    return;
                }

                if (!entry.isIntersecting) {
                    setState("hidden");
                    return;
                }

                observer.unobserve(entry.target);
                setState("hidden");
                animationFrame = window.requestAnimationFrame(() => setState("visible"));
            },
            { threshold: 0.01, rootMargin: "0px 0px -40px 0px" },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            window.cancelAnimationFrame(animationFrame);
        };
    }, []);

    const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

    return (
        <div
            ref={elementRef}
            className={`reveal-on-view reveal-on-view--${direction} ${className}`}
            data-reveal-state={state}
            style={style}
        >
            {children}
        </div>
    );
}
