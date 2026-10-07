import Image from "next/image";
import type { CSSProperties } from "react";
import { IpadMockupCard } from "../components/tablet-mockup-card";
import { LaptopMockupCard } from "../components/laptop-mockup-card";
import { PhoneMockupCard } from "../components/phone-mockup-card";
import RevealOnView from "../components/reveal-on-view";
import ScaledScene from "../components/scaled-scene";
import WalkthroughTrail from "../components/walkthrough-trail";



export default function WalkthroughSection() {
    return (
        <div id="about" className="relative isolate scroll-mt-6 flex flex-col justify-center items-center w-full h-full py-12 md:py-20 bg-[var(--lofi-bg-deep)]">

            <WalkthroughTrail />

            <WalkthroughCard index={"01"} title={"Chat"} description={"Start with a memory, a thank-you, or something you’ve been meaning to say."} visual={<ChatCard01 />} visualWidth={300} />
            <div data-ornament-space className="h-[180px] sm:h-[208px] min-[1440px]:h-[240px] w-full" aria-hidden="true" />
            <WalkthroughCard varient={"fliped"} index={"02"} title={"Preview"} description={"See your words take shape in a letter made for someone special."} visual={<ChatCard02 />} />
            <div data-ornament-space className="h-[180px] sm:h-[208px] min-[1440px]:h-[240px] w-full" aria-hidden="true" />
            <WalkthroughCard index={"03"} title={"Share"} description={"Send a little piece of your heart, ready to open on any screen."} visual={<ChatCard03 />} />
            <div data-ornament-space className="h-[180px] sm:h-[208px] min-[1440px]:h-[240px] w-full" aria-hidden="true" />


        </div>
    )
}

type WalkthroughCardProps = {
    index: string;
    title: string;
    description: string;
    visual: React.ReactNode;
    visualWidth?: number;
    varient?: "normal" | "fliped";
}

export function WalkthroughCard(props: WalkthroughCardProps) {

    const isFlipped = props.varient === "fliped";
    const desktopColumns = isFlipped
        ? "lg:grid-cols-[var(--visual-column-width)_350px]"
        : "lg:grid-cols-[350px_var(--visual-column-width)]";
    const columnStyle = {
        "--visual-column-width": props.visualWidth ? `${props.visualWidth}px` : "minmax(0,1fr)",
    } as CSSProperties;

    return (
        <div data-walkthrough-card style={columnStyle} className={`relative z-10 grid grid-cols-1 items-center lg:justify-center max-w-4xl w-full px-6 lg:px-0 py-10 lg:py-0 lg:h-screen gap-y-6 lg:gap-x-12 ${desktopColumns}`}>

            {/* Image — always first in DOM, shows on top on mobile */}
            <RevealOnView
                direction={isFlipped ? "left-scale" : "right-scale"}
                className={`order-1 flex w-full min-w-0 justify-center lg:order-none lg:row-start-1 ${isFlipped ? "lg:col-start-1 lg:justify-end" : "lg:col-start-2 lg:justify-start"}`}
            >
                {props.visual}
            </RevealOnView>

            {/* Text content */}
            <RevealOnView
                direction={props.varient === "fliped" ? "right" : "left"}
                delay={100}
                className={`order-2 w-full min-w-0 lg:order-none lg:row-start-1 ${isFlipped ? "lg:col-start-2" : "lg:col-start-1"}`}
            >
                <div className="mx-auto lg:mx-0 flex flex-col justify-end items-center lg:items-start w-full gap-6 lg:gap-8 max-w-[350px]">
                    <div className="flex justify-start items-end gap-4">
                        <RevealOnView direction="stamp" delay={150} className="flex shrink-0">
                            <div className="flex justify-center items-center rounded-full size-[36px] bg-[var(--lofi-accent)] text-[var(--lofi-text)] shadow-[0_2px_6px_var(--lofi-shadow)]">
                                <span className="text-sm">{props.index}</span>
                            </div>
                        </RevealOnView>
                        <h2 className="flex justify-center items-end text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.1] text-[var(--lofi-text)] font-[family-name:var(--font-dm-serif)]">{props.title}</h2>
                    </div>

                    <p className="text-[16px] leading-[1.6] w-full text-[var(--lofi-text-muted)] text-center lg:text-left">
                        {props.description}
                    </p>
                </div>
            </RevealOnView>

        </div>
    )
}





const ImageCard = () => (
    <div className="flex justify-center items-center order-1 md:order-none">
        <Image src="/letter.png" alt="letter" className="object-cover" width={230} height={170} />
    </div>
)

const ChatCard01 = () => (
    <div className="flex justify-center lg:justify-start items-center relative w-full">

        <IpadMockupCard variant="spaceGray" visibleRatio={3 / 3} showCamera={true} className="h-auto w-[250px] max-w-full md:w-[300px]">
            <div className="w-full h-full ">
                <Image src="/ChatUI.png" alt="Chat UI" fill className="object-fit" />
            </div>
        </IpadMockupCard>
    </div>
)


const ChatCard02 = () => (
    <div className="relative flex w-full justify-center lg:justify-end">
        <LaptopMockupCard variant="gray" className="">
            <div className="w-full h-full  bg-orange-600">
                <Image src="/Walk02.png" alt="Chat UI" fill className="object-cover" />
            </div>
        </LaptopMockupCard>
    </div>
)


const ChatCard03 = () => (
    <div className="flex justify-center lg:justify-start items-center relative w-full">
        <div className="w-full lg:hidden">
            <ScaledScene>
                <LaptopMockupCard size="desktop" variant="gray" className="absolute bottom-5 left-[148px]">
                    <div className="relative size-full bg-orange-600">
                        <Image src="/Walk02.png" alt="Letter preview on a laptop" fill sizes="432px" className="object-cover" />
                    </div>
                </LaptopMockupCard>
                <IpadMockupCard
                    variant="spaceGray"
                    showCamera
                    className="absolute w-[220px] md:w-[220px] rotate-90"
                    style={{
                        left: "calc(20px + 220px * (247.6 - 178.5) / (2 * 178.5))",
                        bottom: "calc(20px - 220px * (247.6 - 178.5) / (2 * 178.5))",
                    }}
                />
                <PhoneMockupCard className="absolute bottom-5 left-[500px] z-10 h-[240px] w-[120px]" />
            </ScaledScene>
        </div>
        <div className="relative hidden lg:block lg:ml-2 lg:translate-x-[54px] lg:scale-[0.91]">

            <LaptopMockupCard variant="gray" className="relative z-0 ">
                <div className="w-full h-full  bg-orange-600">
                    <Image src="/Walk02.png" alt="Chat UI" fill className="object-cover" />
                </div>
            </LaptopMockupCard>

            <PhoneMockupCard className="absolute bottom-0 right-0 lg:right-auto lg:left-[80%] w-[95px] md:w-[120px] h-[180px] md:h-[240px] z-100" />

            {/* Rotation shortens the visible height from H to W. Offset by -(H - W) / 2
                so the rotated frame's bottom meets the phone's bottom: 0 baseline. */}
            <IpadMockupCard
                variant="spaceGray"
                showCamera={true}
                className="absolute [--ipad-width:180px] md:[--ipad-width:240px] lg:[--ipad-width:220px] left-[calc(var(--ipad-width)*(247.6-178.5)/(2*178.5))] lg:left-[calc(-30%+44px)] w-[var(--ipad-width)] md:w-[var(--ipad-width)] rotate-90"
                style={{ bottom: "calc(var(--ipad-width) * (178.5 - 247.6) / (2 * 178.5))" }}
            />

        </div>
        {/* */}
    </div >
)
