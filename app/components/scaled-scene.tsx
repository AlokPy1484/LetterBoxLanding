"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Scale the complete composition; reserve its scaled height in normal flow.
export default function ScaledScene({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const scene = sceneRef.current;
        if (!container || !scene) return;

        const resize = () => {
            scene.style.transform = `scale(${container.clientWidth / 640})`;
        };
        resize();
        const observer = new ResizeObserver(resize);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative mx-auto aspect-[2/1] w-full max-w-[480px]">
            <div
                ref={sceneRef}
                className="absolute left-0 top-0 h-[320px] w-[640px] origin-top-left"
                style={{ transform: "scale(0.425)" }}
            >
                {children}
            </div>
        </div>
    );
}
