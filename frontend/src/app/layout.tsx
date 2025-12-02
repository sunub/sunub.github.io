import { Provider } from "jotai";
import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import type React from "react";
import type { Theme } from "type";
import StyledComponentsRegistry from "@/components/Resgistry/";
import { initSetColorsByThemeFn } from "@/components/Theme/InitTheme/InitThemeValue";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/constants";
import { AnimatePresenceWrapper } from "@/features/AnimatePresenceWrapper";
import { craftyGirls, pretendardRegular } from "./font";
import { GlobalStyle, ShikiOverrieds } from "./GlobalStyle"; // 새로 만든 파일 import

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

export const viewport: Viewport = {
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: LIGHT_COLORS["--color-background"],
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: DARK_COLORS["--color-background"],
		},
	],
	colorScheme: "light dark",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	width: "device-width",
};

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
			className={`${pretendardRegular.variable} ${craftyGirls.variable}`}
			suppressHydrationWarning={true}
			data-color-theme={theme}
			style={themeColors as React.CSSProperties}
		>
			<head>
				<meta
					name="description"
					content="sunub가 만든 개인 블로그입니다. 주로 프론트엔드 개발과 관련된 여러 지식들을 다루지만 이외에도 다양한 개발 지식을 공유하기 위한 사이트입니다."
				/>
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
					<GlobalStyle />
					<ShikiOverrieds />
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
