import Image from "next/image";
import HeroSection from "./section/hero-section";
import WalkthroughSection from "./section/walkthrough-section";
import FooterSection from "./section/footer-section";


export default function page() {


  return (

    <div className="flex flex-col justify-start items-center w-full h-full">
      <HeroSection />
      <WalkthroughSection />
      <FooterSection />
    </div>
  )
}