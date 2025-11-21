import { cookies } from "next/headers";
import type { Theme } from "type";
import { Wave } from "@/components/Header/Wave";
import { HeroImage } from "@/components/HeroImage";
import NewestPost from "@/components/Main/NewestPost";
import { FeatherIcon } from "@/components/Main/NewestPost/FeatherIcon";
import { RootLayout } from "@/features/RootLayout";
import {
	HeaderContentsWrapper,
	MainWrapper,
	Title,
	TitleWrapper,
} from "./page.style";

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
					<NewestPost />
				</MainWrapper>
			</div>
		</RootLayout>
	);
}
