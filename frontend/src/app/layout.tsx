import "./globals.css";
import "katex/dist/katex.min.css";
import { Provider } from "jotai";
import type { Metadata, Viewport } from "next";
import type React from "react";
import StyledComponentsRegistry from "@/components/Resgistry/";
import { initSetColorsByThemeFn } from "@/components/Theme/InitTheme/InitThemeValue";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/constants";
import { craftyGirls, pretendardRegular } from "./font";
import { ShikiOverrieds } from "./GlobalStyle";

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="ko"
			className={`${pretendardRegular.variable} ${craftyGirls.variable}`}
			data-color-theme="light"
			suppressHydrationWarning={true}
		>
			<head>
				<meta
					name="description"
					content="sunub가 만든 개인 블로그입니다. 주로 프론트엔드 개발과 관련된 여러 지식들을 다루지만 이외에도 다양한 개발 지식을 공유하기 위한 사이트입니다."
				/>
				<link
					key="/assets/favicon.ico"
					rel="icon"
					href="/assets/favicon.ico"
					type="image/x-icon"
					sizes="32x32"
				/>
				<script id="theme-script">{initSetColorsByThemeFn}</script>
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
					<ShikiOverrieds />
					<Provider>
						<div id="mobile-nav-portal" />
						<div
							id="blog-search__input-area"
							data-testid={"blog-search__input-area"}
						/>

						{children}
					</Provider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
