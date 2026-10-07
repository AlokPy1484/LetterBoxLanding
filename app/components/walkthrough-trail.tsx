"use client";

import { useEffect, useRef, useState } from "react";
import BotanicalFlower from "./botanical-flower";
import styles from "./walkthrough-trail.module.css";

type Segment = { left: string; right: string; branch: string; start: number; end: number; x: number; y: number; size: number };
const clamp = (n: number) => Math.max(0, Math.min(1, n));

export default function WalkthroughTrail() {
    const layer = useRef<HTMLDivElement>(null);
    const segmentsRef = useRef<Segment[]>([]);
    const [scene, setScene] = useState<{ width: number; height: number; narrow: boolean; segments: Segment[] }>({ width: 1, height: 1, narrow: false, segments: [] });
    useEffect(() => {
        const element = layer.current;
        const section = element?.parentElement;
        if (!element || !section) return;
        const preference = matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        let alive = true;
        const update = () => {
            frame = 0;
            const head = window.innerHeight * .78 - section.getBoundingClientRect().top;
            element.querySelectorAll<SVGGElement>("[data-ink-segment]").forEach((group, index) => {
                const segment = segmentsRef.current[index];
                if (!segment) return;
                const p = preference.matches ? 1 : clamp((head - segment.start) / (segment.end - segment.start));
                group.style.setProperty("--draw", String(clamp(p / .72)));
                group.style.setProperty("--branch", String(clamp((p - .65) / .13)));
                group.style.setProperty("--grow", String(clamp((p - .76) / .24)));
            });
        };
        const request = () => { if (!frame) frame = requestAnimationFrame(update); };
        const measure = () => {
            const bounds = section.getBoundingClientRect();
            const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-walkthrough-card]"));
            const ornaments = Array.from(section.querySelectorAll<HTMLElement>("[data-ornament-space]"));
            const width = bounds.width;
            const wide = width >= 1440;
            const edge = wide ? Math.max(30, (width - 896) / 2 - 65) : 11;
            const segments = cards.map((card, index) => {
                const c = card.getBoundingClientRect();
                const o = ornaments[index].getBoundingClientRect();
                const start = c.top - bounds.top;
                const end = o.bottom - bounds.top;
                const gap = o.top - bounds.top;
                const y = end - 18;
                const x = width * (index % 2 ? .62 : .38);
                const loop = Math.min(width * .16, 100);
                const makePath = (right: boolean) => {
                    const e = right ? width - edge : edge;
                    const sign = right ? -1 : 1;
                    const a = loop * (right === (index % 2 === 1) ? 1 : .62);
                    return `M${e} ${start} C${e + sign * 5} ${start + (gap-start)*.3} ${e - sign * 5} ${gap-35} ${e} ${gap} C${e + sign*a} ${gap+12} ${e + sign*a*1.3} ${gap+90} ${e + sign*a*.4} ${gap+95} C${e - sign*a*.25} ${gap+100} ${e + sign*a*.1} ${gap+35} ${e + sign*a*.55} ${gap+54} C${e + sign*a} ${gap+85} ${e} ${end-30} ${e} ${end}`;
                };
                const source = width < 400 ? edge : index % 2 ? width-edge : edge;
                return { left: makePath(false), right: makePath(true), branch: `M${source} ${y} C${source} ${y-15} ${x-30} ${y+10} ${x} ${y}`, start, end, x, y, size: width < 400 ? 105 : wide ? 158 : 130 };
            });
            segmentsRef.current = segments;
            setScene({ width, height: bounds.height, narrow: width < 400, segments });
            request();
        };
        const observer = new ResizeObserver(measure);
        observer.observe(section);
        section.querySelectorAll("[data-walkthrough-card], [data-ornament-space]").forEach(node => observer.observe(node));
        window.addEventListener("scroll", request, { passive: true });
        window.addEventListener("resize", measure);
        preference.addEventListener("change", request);
        document.fonts.ready.then(() => { if (alive) measure(); });
        measure();
        return () => { alive = false; observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", request); window.removeEventListener("resize", measure); preference.removeEventListener("change", request); };
    }, []);

    return <div ref={layer} className={styles.layer} aria-hidden="true">
        <svg width="100%" height="100%" viewBox={`0 0 ${scene.width} ${scene.height}`} fill="none">
            {scene.segments.map((s, index) => <g key={index} data-ink-segment>
                {[s.left, ...(scene.narrow ? [] : [s.right])].map((path, i) => <g key={i} stroke="var(--lofi-text-muted)" strokeWidth="1.5" strokeLinecap="round">
                    <path d={path} opacity=".12" />
                    <path className={styles.ink} d={path} pathLength="1" />
                </g>)}
                <path className={styles.branch} d={s.branch} pathLength="1" stroke="var(--lofi-text-muted)" strokeWidth="1.3" />
                {index > 0 && <BotanicalFlower x={s.x + s.size*.47} y={s.y} size={s.size*.76} angle={17} delay={.1} />}
                {index > 1 && <BotanicalFlower x={s.x - s.size*.48} y={s.y} size={s.size*.65} angle={-20} delay={.2} />}
                <path className={styles.branch} d={`M${s.x-s.size*.48} ${s.y} Q${s.x} ${s.y-5} ${s.x+s.size*.47} ${s.y}`} pathLength="1" stroke="var(--lofi-text-muted)" strokeWidth="1.2" />
                <BotanicalFlower x={s.x} y={s.y} size={s.size} angle={index % 2 ? 8 : -7} />
                <BotanicalFlower x={s.x-s.size*.35} y={s.y} size={s.size*.55} angle={-25} bud />
                <BotanicalFlower x={s.x+s.size*.22} y={s.y} size={s.size*.48} angle={30} bud delay={.12} />
            </g>)}
        </svg>
    </div>;
}
