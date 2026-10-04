import Image from "next/image";




export default function HeroSection() {

    return (
        <div className="relative flex flex-col justify-between items-center pt-24 md:pt-40 pb-8 w-screen h-screen">

            {/* Background image */}
            <div className="absolute inset-0 w-full h-screen -z-10">
                <Image src="/HeroBackground.png" alt="HeroBackground" fill className="object-cover" />
            </div>

            {/* Warm overlay to mute the background into lo-fi tones */}
            <div className="absolute inset-0 w-full h-screen -z-10 bg-[var(--lofi-bg)]/40" />


            <div className="flex flex-col justify-start items-center gap-4 w-full max-w-4xl px-6">
                <span className="flex justify-center items-center bg-[var(--lofi-accent)] text-[var(--lofi-text)] px-4 py-2 text-xs rounded-[20px] shadow-[0_2px_8px_var(--lofi-shadow)]">
                    Get your free letter
                </span>
                <div className="w-full text-[32px] leading-[38px] md:text-[60px] md:leading-[60px] tracking-[-4%] font-semibold text-center text-[var(--lofi-text)] font-[family-name:var(--font-dm-serif)]">
                    gift something memorable to someone who matters.
                </div>
                <div className="text-[16px] md:text-[24px] tracking-[-8%] text-[var(--lofi-text-muted)] text-center">digital letters that reflects your love  and care.</div>
                <div className="flex justify-center items-center gap-4 md:gap-16 text-[16px]">
                    <button className="flex justify-center px-5 py-2.5 bg-[var(--lofi-accent-soft)] text-[var(--lofi-text)] rounded-[20px] shadow-[0_2px_8px_var(--lofi-shadow)] hover:shadow-[0_4px_16px_var(--lofi-shadow)] transition-shadow duration-300">
                        Get started
                    </button>
                    <button className="flex justify-center px-5 py-2.5 rounded-[20px] border border-[var(--lofi-border)] text-[var(--lofi-text-muted)] hover:bg-[var(--lofi-accent-soft)]/30 transition-colors duration-300">
                        Watch Demo
                    </button>
                </div>
            </div>


            <div>
                <button className="px-4 py-2 border border-[var(--lofi-border)] bg-[var(--lofi-bg)]/40 rounded-[20px] text-[16px] text-[var(--lofi-text-muted)] backdrop-blur-sm hover:bg-[var(--lofi-bg)]/60 transition-colors duration-300">Scroll</button>
            </div>

        </div>
    )
}