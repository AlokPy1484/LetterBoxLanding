import Image from "next/image";
import RevealOnView from "../components/reveal-on-view";
import EnvelopeCta from "../components/envelope-cta";




export default function FooterSection() {


    return (
        <section className="flex justify-center items-start  relative min-h-[60vh] md:min-h-[80vh] pb-[max(150px,20vw)] w-full  bg-[var(--lofi-bg-footer)]">


            <div className="flex flex-col justify-start items-center gap-6 z-100 mt-[10vh] md:mt-[14vh] px-6">

                {/* Logo */}
                <RevealOnView direction="up">
                    <div className="flex justify-center items-center gap-3 md:gap-4">
                        <span>
                            <Image src="/PlaceholderLogo.png" alt="Placeholder" width={50} height={50} className="rounded-full" />
                        </span>
                        <h2 className="text-2xl md:text-5xl font-normal text-[var(--lofi-text)] tracking-[-0.03em] font-[family-name:var(--font-dm-serif)]">LetterBox</h2>
                    </div>
                </RevealOnView>

                {/* Tagline */}
                <RevealOnView direction="up" delay={120}>
                    <p className="text-sm md:text-sm text-[var(--lofi-text-muted)] text-center max-w-xs">
                        Craft heartfelt digital letters for the people who matter most.
                    </p>
                </RevealOnView>

                {/* Nav links */}
                {/* <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm">
                    <a href="#" className="text-[var(--lofi-text)] hover:text-[var(--lofi-accent)] transition-colors duration-200">Product</a>
                    <a href="#" className="text-[var(--lofi-text)] hover:text-[var(--lofi-accent)] transition-colors duration-200">About</a>
                    <a href="#" className="text-[var(--lofi-text)] hover:text-[var(--lofi-accent)] transition-colors duration-200">Privacy</a>
                    <a href="#" className="text-[var(--lofi-text)] hover:text-[var(--lofi-accent)] transition-colors duration-200">Terms</a>
                </nav> */}

                {/* CTA */}
                <RevealOnView direction="up" delay={240}>
                    <EnvelopeCta />
                </RevealOnView>


                {/* Copyright & socials */}
                {/* <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs text-[var(--lofi-text-muted)]">
                    <span>© 2026 LetterBox. All rights reserved.</span>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-[var(--lofi-accent)] transition-colors duration-200">Twitter</a>
                        <a href="#" className="hover:text-[var(--lofi-accent)] transition-colors duration-200">Instagram</a>
                        <a href="#" className="hover:text-[var(--lofi-accent)] transition-colors duration-200">GitHub</a>
                    </div>
                </div> */}

            </div>
            {/* bg-[var(--lofi-bg-deep)] */}

            {/* Wave */}
            <div className="absolute inset-x-0 top-0 w-full bg-[var(--lofi-bg-deep)]  ">
                <svg
                    viewBox="0 0 1280 108"
                    preserveAspectRatio="none"
                    className="block h-auto w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M-11 108L-11 77.7912C-11 77.7912 385.608 -0.618141 641.061 0.00367737C891.406 0.613068 1280 77.7912 1280 77.7912V108L-11 108Z"
                        fill="var(--lofi-bg-footer)"
                    />
                </svg>
            </div>

            {/* Ground */}
            <RevealOnView direction="up" className="absolute inset-x-0 bottom-0 w-full">
                <Image
                    src="/FooterGround.png"
                    alt=""
                    width={1500}
                    height={250}
                    className="block h-auto w-full"
                />
            </RevealOnView>

            {/* Foreground */}
            <RevealOnView direction="up" delay={140} className="absolute inset-x-0 bottom-0 w-full">
                <Image
                    src="/FooterImage.png"
                    alt=""
                    width={1500}
                    height={250}
                    className="block h-auto w-full"
                />
            </RevealOnView>

        </section>
    )
}
