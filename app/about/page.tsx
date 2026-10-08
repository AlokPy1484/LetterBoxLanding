import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
    title: "About LetterBox — A Little Thought. A Lasting Feeling.",
    description: "Discover LetterBox: a thoughtful way to turn your words into personal digital letters for the people who matter.",
};

const steps = [
    { title: "Start with a thought", text: "A memory, a thank-you, or the words you’ve been meaning to say. You don’t need a special occasion." },
    { title: "Make it feel like you", text: "Choose a theme, write your message, and watch it take shape in a letter with its own atmosphere." },
    { title: "Send a little feeling", text: "Share your letter with someone who matters, ready for them to open on their favorite screen." },
];

export default function AboutPage() {
    return (
        <main className="relative min-h-screen bg-[var(--lofi-bg)] px-6 pb-20 pt-36 md:pt-44">
            <Navbar />
            <div className="mx-auto max-w-4xl">
                <header className="mx-auto max-w-2xl text-center">
                    <p className="mb-5 text-xs tracking-[0.16em] text-[var(--lofi-text-muted)] uppercase">The thought behind LetterBox</p>
                    <h1 className="font-[family-name:var(--font-dm-serif)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.03em]">
                        Some words deserve<br />a little more space.
                    </h1>
                    <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[var(--lofi-text-muted)] md:text-lg">
                        LetterBox is a cozy place for heartfelt digital letters. A way to turn what you feel into something personal, thoughtful, and ready to share.
                    </p>
                </header>

                <section aria-labelledby="about-why" className="my-14 rounded-[28px] border border-[var(--lofi-border)] bg-[var(--lofi-bg-deep)] px-7 py-9 md:my-20 md:px-14 md:py-12">
                    <p className="mb-4 text-xs tracking-[0.12em] text-[var(--lofi-text-muted)] uppercase">For the moments that matter</p>
                    <h2 id="about-why" className="font-[family-name:var(--font-dm-serif)] text-3xl md:text-4xl">A little thought. A lasting feeling.</h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--lofi-text-muted)]">
                        Some messages are worth slowing down for. The small thank-you. The memory you still smile about. The person you want to remind: you matter to me. LetterBox gives those words a place of their own.
                    </p>
                </section>

                <section aria-labelledby="about-how">
                    <h2 id="about-how" className="mb-8 text-center font-[family-name:var(--font-dm-serif)] text-3xl md:text-4xl">From a thought to a treasured letter.</h2>
                    <ol className="grid gap-6 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <li key={step.title} className="rounded-3xl border border-[var(--lofi-border)] p-6">
                                <span className="mb-5 inline-flex size-9 items-center justify-center rounded-full bg-[var(--lofi-accent-soft)] text-sm">0{index + 1}</span>
                                <h3 className="font-[family-name:var(--font-dm-serif)] text-2xl">{step.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--lofi-text-muted)]">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <div className="mt-14 text-center">
                    <Link href="/#about" className="inline-flex rounded-full bg-[var(--lofi-accent-soft)] px-6 py-3 text-sm shadow-[0_2px_8px_var(--lofi-shadow)] transition-shadow hover:shadow-[0_4px_16px_var(--lofi-shadow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lofi-accent)]">
                        See how LetterBox works →
                    </Link>
                </div>
            </div>
        </main>
    );
}
