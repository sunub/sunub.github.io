import { Suspense } from "react";
import { FeaturedPost } from "@/components/Main/FeaturedPost";
import { FeatherIcon } from "@/components/Main/Icon";
import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import Spacer from "@/components/Spacer";
import { HomeHeroSection } from "./HomeHeroSection";
import { MainWrapper, Title, TitleWrapper } from "./page.style";

export default async function Page() {
	return (
		<>
			<HomeHeroSection />
			<div id="blog-main-wrapper">
				<MainWrapper id="blog-main__recently-post-list-wrapper">
					<TitleWrapper>
						<FeatherIcon />
						<Title>최신 포스트들</Title>
					</TitleWrapper>

					<Spacer axis={"vertical"} size={32} />
					<Suspense fallback={<FrontMatterLoading length={2} />}>
						<FeaturedPost />
					</Suspense>
				</MainWrapper>
			</div>
		</>
	);
}
