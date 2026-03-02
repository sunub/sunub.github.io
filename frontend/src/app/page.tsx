import { cookies } from "next/headers";
import type { Theme } from "type";
import { Wave } from "@/components/Header/Wave";
import { HeroImage } from "@/components/HeroImage";
import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import { RootLayout } from "@/features/RootLayout";
import {
	HeaderContentsWrapper,
	MainWrapper,
	Title,
	TitleWrapper,
} from "./page.style";
import { FeatherIcon } from "@/components/Main/Icon";
import { Suspense } from "react";
import { FeaturedPost } from "@/components/Main/FeaturedPost";

export default async function Page() {
	const savedTheme = (await cookies()).get("color-theme")?.value || "light";
	const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light";

	return (
		<RootLayout>
			<HeaderContentsWrapper>
				<HeroImage initialTheme={initialTheme} />
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
	);
}
