import { Wave } from "@/components/Header/Wave";
import { HeroImage } from "@/components/HeroImage";
import { HeroImageWrapper } from "./HeroImage.style";
import { HeroImageIdleWarmup } from "./HeroImageIdleWarmup";

export function HeroImageSection() {
	return (
		<HeroImageWrapper>
			<HeroImageIdleWarmup />
			<HeroImage />
			<Wave />
		</HeroImageWrapper>
	);
}
