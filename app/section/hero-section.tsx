import Image from "next/image";
import Navbar from "../components/navbar";
import RevealOnView from "../components/reveal-on-view";
import HeroScrollCue from "../components/hero-scroll-cue";




export default function HeroSection() {

    return (
        <div className="relative flex flex-col justify-between items-center pt-[212px] md:pt-40 pb-8 w-screen min-h-screen">

            <Navbar />

            {/* Background image */}
            <div className="absolute inset-0 w-full h-full -z-10">
                <Image src="/HeroBackground.png" alt="HeroBackground" fill className="object-cover" />
            </div>

            {/* Warm overlay to mute the background into lo-fi tones */}
            <div className="absolute inset-0 w-full h-full -z-10 bg-[var(--lofi-bg)]/40" />


            <div className="flex flex-col justify-start items-center gap-4 w-full max-w-4xl px-6">
                <RevealOnView direction="up">
                    <span className="flex justify-center items-center bg-[var(--lofi-accent)] text-[var(--lofi-text)] px-4 py-2 text-xs rounded-[20px] shadow-[0_2px_8px_var(--lofi-shadow)]">
                        Get your free letter
                    </span>
                </RevealOnView>
                <RevealOnView direction="up" delay={120} className="w-full">
                    <h1 className="w-full text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.025em] font-normal text-center text-[var(--lofi-text)] font-[family-name:var(--font-dm-serif)]">
                        Something memorable. For someone who matters.
                    </h1>
                </RevealOnView>
                <RevealOnView direction="up" delay={220}>
                    <div className="text-[16px] md:text-[24px] leading-[1.6] text-[var(--lofi-text-muted)] text-center">Turn what you feel into a letter they’ll treasure.</div>
                </RevealOnView>
                <RevealOnView direction="up" delay={320}>
                    <div className="flex justify-center items-center gap-4 md:gap-16 text-[16px]">
                        <button className="flex justify-center px-5 py-2.5 bg-[var(--lofi-accent-soft)] text-[var(--lofi-text)] rounded-[20px] shadow-[0_2px_8px_var(--lofi-shadow)] hover:shadow-[0_4px_16px_var(--lofi-shadow)] transition-shadow duration-300">
                            Get started
                        </button>
                        <button className="flex justify-center px-5 py-2.5 rounded-[20px] border border-[var(--lofi-border)] text-[var(--lofi-text-muted)] hover:bg-[var(--lofi-accent-soft)]/30 transition-colors duration-300">
                            Watch Demo
                        </button>
                    </div>
                </RevealOnView>
            </div>


            <HeroScrollCue />

        </div>
    )
}
