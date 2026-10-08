import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav
            aria-label="Primary navigation"
            className="absolute left-1/2 top-4 z-20 flex w-2xl max-w-[calc(100%-2rem)] -translate-x-1/2 items-center justify-between rounded-full border border-[var(--lofi-border)]/70 bg-[var(--lofi-bg)]/65 px-4 py-2.5 shadow-[0_2px_12px_var(--lofi-shadow)] backdrop-blur-md md:top-6 md:px-5 md:py-3"
        >
            <Link href="/" aria-label="LetterBox home" className="flex min-w-0 items-center gap-2">
                <Image
                    src="/PlaceholderLogo.png"
                    alt=""
                    width={38}
                    height={28}
                    className="shrink-0 object-contain"
                />
                <span className="truncate font-[family-name:var(--font-dm-serif)] text-lg text-[var(--lofi-text)] md:text-xl">
                    LetterBox
                </span>
            </Link>

            <div className="flex shrink-0 items-center gap-5 md:gap-7">
                <Link
                    href="/about"
                    className="text-sm font-light text-[var(--lofi-text-muted)] transition-colors hover:text-[var(--lofi-text)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--lofi-accent)]"
                >
                    About
                </Link>
            </div>
        </nav>
    );
}
