import type { CSSProperties } from "react";
import styles from "./walkthrough-trail.module.css";

const petals = [
    "M80 63C55 51 52 24 69 17C87 11 102 40 80 63Z",
    "M80 63C58 49 60 18 78 16C99 19 102 45 80 63Z",
    "M80 63C52 47 59 25 73 20C92 12 105 42 80 63Z",
];

export default function BotanicalFlower({ x, y, size = 140, angle = 0, bud = false, delay = 0 }: {
    x: number; y: number; size?: number; angle?: number; bud?: boolean; delay?: number;
}) {
    return (
        <svg x={x - size / 2} y={y - size} width={size} height={size} viewBox="0 0 160 160" overflow="visible" fill="none" style={{ "--flower-delay": delay } as CSSProperties}>
            <g transform={`rotate(${angle} 80 160)`}>
                <path className={styles.stem} pathLength="1" d="M80 160C68 127 92 100 80 63" stroke="var(--lofi-text-muted)" strokeWidth="1.6" />
                {[false, true].map((right, i) => (
                    <g key={i} transform={right ? "translate(160 -15) scale(-1 1)" : undefined}>
                        <g className={styles.leaf}>
                            <path d="M79 127C57 126 42 110 44 94C64 93 78 106 79 127Z" fill="#b7b18d" stroke="#77745a" strokeWidth="1" />
                            <path d="M78 126Q59 110 48 99M64 114L63 103M64 114L53 113" stroke="#77745a" strokeWidth=".7" />
                        </g>
                    </g>
                ))}
                <g className={styles.sepal}>
                    <path d="M80 68Q58 52 68 39L80 51L90 37Q102 55 80 68Z" fill="#a8a47e" stroke="#77745a" />
                </g>
                {!bud && [0, 71, 143, 216, 288].map((rotation, i) => (
                    <g key={rotation} transform={`rotate(${rotation} 80 62)`}>
                        <g className={styles.outer} style={{ "--petal-index": i } as CSSProperties}>
                            <path d={petals[i % 3]} fill={i % 2 ? "#e8c6ab" : "#f0d8bb"} stroke="#b68d70" strokeWidth="1" />
                            <path d="M80 61Q72 45 74 24M79 56Q65 40 65 34M80 51Q86 36 83 29" stroke="#b68d70" strokeWidth=".6" opacity=".6" />
                            <path d="M80 61Q67 50 69 39Q80 45 80 61Z" fill="#b98266" opacity=".15" />
                        </g>
                    </g>
                ))}
                {[35, 125, 215, 305].map((rotation, i) => (
                    <g key={rotation} transform={`rotate(${rotation} 80 62)`}>
                        <g className={bud ? styles.bud : styles.inner} style={{ "--petal-index": i } as CSSProperties}>
                            <path d="M80 65C64 52 63 33 76 30C93 26 98 50 80 65Z" fill="#f4e3cc" stroke="#bd9276" strokeWidth="1" />
                            <path d="M80 61Q74 47 77 35" stroke="#bd9276" strokeWidth=".7" />
                        </g>
                    </g>
                ))}
                {!bud && <g className={styles.center}>
                    <circle cx="80" cy="62" r="7" fill="#bd9160" />
                    {[[77,59],[82,58],[84,63],[79,65],[75,63],[80,61]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="1.1" fill="#6e624f" />)}
                </g>}
            </g>
        </svg>
    );
}
