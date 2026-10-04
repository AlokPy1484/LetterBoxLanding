import Image from "next/image";
import { IpadMockupCard } from "../components/tablet-mockup-card";
import { LaptopMockupCard } from "../components/laptop-mockup-card";
import { PhoneMockupCard } from "../components/phone-mockup-card";



export default function WalkthroughSection() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full py-20 bg-[var(--lofi-bg-deep)]">


            <WalkthroughCard index={"01"} title={"Chat"} description={"Chat with AI assistant to get quick replies to your questions, or let it handle small tasks for you."} visual={<ChatCard01 />} />
            <WalkthroughCard varient={"fliped"} index={"02"} title={"Preview"} description={"Chat with AI assistant to get quick replies to your questions, or let it handle small tasks for you."} visual={<ChatCard02 />} />
            <WalkthroughCard index={"03"} title={"Share"} description={"Chat with AI assistant to get quick replies to your questions, or let it handle small tasks for you."} visual={<ChatCard03 />} />




        </div>
    )
}

type WalkthroughCardProps = {
    index: string;
    title: string;
    description: string;
    visual: React.ReactNode;
    varient?: "normal" | "fliped";
}

export function WalkthroughCard(props: WalkthroughCardProps) {

    // On mobile: always image-on-top, text-below (flex-col)
    // On desktop: normal = text-left image-right (flex-row), flipped = image-left text-right (flex-row-reverse keeps DOM order consistent)
    const directionClass = props.varient === "fliped"
        ? "flex-col md:flex-row-reverse "
        : "flex-col md:flex-row";

    return (
        <div className={`flex ${directionClass} justify-center md:justify-between items-center max-w-4xl w-full px-6 md:px-0 py-16 md:py-0 md:h-screen gap-8 md:gap-0`}>

            {/* Image — always first in DOM, shows on top on mobile */}
            {props.visual}

            {/* Text content */}
            <div className={`flex flex-col justify-end items-center md:items-start w-full gap-6 md:gap-8 max-w-full md:max-w-[350px] order-2 md:order-none ${props.varient === "fliped" ? "" : "md:order-first"}`}>

                <div className="flex justify-start items-end gap-4">
                    <div className="flex justify-center items-center rounded-full size-[36px] bg-[var(--lofi-accent)] text-[var(--lofi-text)] shadow-[0_2px_6px_var(--lofi-shadow)]">
                        <a className="text-sm">{props.index}</a>
                    </div>
                    <div className="flex justify-center items-end text-[40px] md:text-[64px] font-semibold leading-[36px] md:leading-[50px] text-[var(--lofi-text)] font-[family-name:var(--font-dm-serif)]">{props.title}</div>
                </div>

                <p className="text-[16px] w-full text-[var(--lofi-text-muted)] text-center md:text-left">
                    {props.description}
                </p>
            </div>

        </div>
    )
}





const ImageCard = () => (
    <div className="flex justify-center items-center order-1 md:order-none">
        <Image src="/letter.png" alt="letter" className="object-cover" width={230} height={170} />
    </div>
)

const ChatCard01 = () => (
    <div className="flex justify-center items-center relative w-full">

        <IpadMockupCard variant="spaceGray" visibleRatio={3 / 3} showCamera={true} className="h-[500px]">
            <div className="w-full h-full ">
                <Image src="/ChatUI.png" alt="Chat UI" fill className="object-fit" />
            </div>
        </IpadMockupCard>
    </div>
)


const ChatCard02 = () => (
    <div className="relative w-full">
        <LaptopMockupCard variant="gray" className="">
            <div className="w-full h-full  bg-orange-600">
                <Image src="/Walk02.png" alt="Chat UI" fill className="object-cover" />
            </div>
        </LaptopMockupCard>
    </div>
)


const ChatCard03 = () => (
    <div className="flex justify-center items-center relative ">
        {/* <IpadMockupCard variant="spaceGray" showCamera={true} className="absolute top-0 left-0 w-[220px] md:w-[240px] rotate-90">
        
    </IpadMockupCard> */}
        {/* <PhoneMockupCard className="absolute top-0 left-0  w-[140px] h-[240px]" /> */}
        <div className="relative ">

            <LaptopMockupCard variant="gray" className="relative z-0 ">
                <div className="w-full h-full  bg-orange-600">
                    <Image src="/Walk02.png" alt="Chat UI" fill className="object-cover" />
                </div>
            </LaptopMockupCard>

            <PhoneMockupCard className="absolute -bottom-0 left-[80%]  w-[95px] md:w-[120px] h-[180px] md:h-[240px] z-100" />

            <IpadMockupCard variant="spaceGray" showCamera={true} className="absolute bottom-[-20%] md:top-0 left-[-30%] w-[180px] md:w-[240px] rotate-90" />

        </div>
        {/* */}
    </div >
)

