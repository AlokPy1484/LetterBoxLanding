import type { ReactNode } from "react";

type WriteLetterLinkProps = {
    label: string;
    className?: string;
    icon?: ReactNode;
};

export default function WriteLetterLink({ label, className, icon }: WriteLetterLinkProps) {
    return (
        <a href="https://letter-box-rho.vercel.app/write-a-letter" className={className}>
            {icon}
            <span className="flex flex-col items-center justify-center">{label}</span>
        </a>
    );
}
