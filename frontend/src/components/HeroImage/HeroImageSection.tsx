import { HeroImageIdleWarmup } from "./HeroImageIdleWarmup";
import { HeroImageWrapper } from "./HeroImage.style"
import { HeroImage } from "@/components/HeroImage";
import { Wave } from "@/components/Header/Wave";

export function HeroImageSection() {
  return (
    <HeroImageWrapper>
      <HeroImageIdleWarmup />
      <HeroImage />
      <Wave />
    </HeroImageWrapper>
  )
}
