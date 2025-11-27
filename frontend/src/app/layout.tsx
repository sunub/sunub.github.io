import { Provider } from "jotai";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import type React from "react";
import type { Theme } from "type";
import { HeroImagePreload } from "@/components/HeroImage/HeroImagePreload";
import StyledComponentsRegistry from "@/components/Resgistry/";
import { initSetColorsByThemeFn } from "@/components/Theme/InitTheme/InitThemeValue";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/constants";
import { AnimatePresenceWrapper } from "@/features/AnimatePresenceWrapper";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://sunub.vercel.app"),
	title: {
		default: "sun_ub",
		template: "%s | sun_ub",
	},
	keywords: ["sunub", "sun_ub"],
	description: "디자인과 개발을 좋아합니다.",
	openGraph: {
		title: "sun_ub",
		description: "디자인과 개발을 좋아합니다.",
		url: "https://sunub.vercel.app",
		siteName: "sun_ub",
		type: "website",
		locale: "ko_KR",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

const pretendard = localFont({
	src: "../../public/fonts/PretendardVariable.woff2",
	display: "swap",
	style: "normal",
	variable: "--pretendard-font",
	fallback: ["system-ui", "sans-serif"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();

	const headersList = await headers();
	const prefers = headersList.get("sec-ch-prefers-color-scheme");

	const theme: Theme = cookieStore.has("color-theme")
		? (cookieStore.get("color-theme")?.value as Theme)
		: prefers === "dark"
			? "dark"
			: "light";
	const themeColors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;

	return (
		<html
			lang="ko"
			className={pretendard.className}
			suppressHydrationWarning={true}
			data-color-theme={theme}
			style={themeColors as React.CSSProperties}
		>
			<head>
				<meta
					name="description"
					content="sunub가 만든 개인 블로그입니다. 주로 프론트엔드 개발과 관련된 여러 지식들을 다루지만 이외에도 다양한 개발 지식을 공유하기 위한 사이트입니다."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, user-scalable=1"
				></meta>
				<HeroImagePreload theme={theme} />
				<Script id="theme-script" strategy="beforeInteractive">
					{initSetColorsByThemeFn}
				</Script>
			</head>
			<body>
				<script type="application/ld+json">
					{`
            ${JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							name: "sun_ub",
							url: "https://sunub.vercel.app",
							description: "디자인과 개발을 좋아합니다.",
						})}
          `}
				</script>
				<StyledComponentsRegistry>
					<ThemeProvider initialTheme={theme}>
						<Provider>
							<AnimatePresenceWrapper>{children}</AnimatePresenceWrapper>
							<div id="mobile-nav-portal" />
							<div
								id="blog-search__input-area"
								data-testid={"blog-search__input-area"}
							/>
						</Provider>
					</ThemeProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
