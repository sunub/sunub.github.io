import { HeroImagePreload } from "@/components/HeroImage/HeroImagePreload";
import { HeroImageSection } from "@/components/HeroImage/HeroImageSection";
import { getRequestTheme } from "@/utils/theme";

export async function HomeHeroSection() {
	const theme = await getRequestTheme();

	return (
		<>
			<HeroImagePreload theme={theme} />
			<HeroImageSection />
		</>
	);
}
