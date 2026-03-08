import { Suspense } from "react";
import { Wave } from "@/components/Header/Wave";
import { HeroImage } from "@/components/HeroImage";
import { HeroImagePreload } from "@/components/HeroImage/HeroImagePreload";
import { FeaturedPost } from "@/components/Main/FeaturedPost";
import { FeatherIcon } from "@/components/Main/Icon";
import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import { RootLayout } from "@/features/RootLayout";
import { getRequestTheme } from "@/utils/theme";
import {
	HeaderContentsWrapper,
	MainWrapper,
	Title,
	TitleWrapper,
} from "./page.style";

export default async function Page() {
	const theme = await getRequestTheme();

	return (
		<>
			<HeroImagePreload theme={theme} />
			<RootLayout>
				<HeaderContentsWrapper>
					<HeroImage initialTheme={theme} />
					<Wave />
				</HeaderContentsWrapper>

				<div id="blog-main-wrapper">
					<MainWrapper id="blog-main__recently-post-list-wrapper">
						<TitleWrapper>
							<FeatherIcon />
							<Title>최신 포스트들</Title>
						</TitleWrapper>

						<Suspense fallback={<FrontMatterLoading length={2} />}>
							<FeaturedPost />
						</Suspense>
					</MainWrapper>
				</div>
			</RootLayout>
		</>
	);
}
