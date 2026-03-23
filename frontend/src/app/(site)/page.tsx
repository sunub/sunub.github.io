import {
	FreshChroniclesArchiveCard,
	FreshChroniclesSection,
} from "@/components/Main/FreshChronicles";
import { HomeHeroSection } from "./HomeHeroSection";
import { MainWrapper } from "./page.style";

export default async function Page() {
	return (
		<>
			<HomeHeroSection />
			<div id="blog-main-wrapper">
				<MainWrapper id="blog-main__featured-post-wrapper">
					<FreshChroniclesSection>
						<FreshChroniclesArchiveCard />
					</FreshChroniclesSection>
				</MainWrapper>
			</div>
		</>
	);
}
