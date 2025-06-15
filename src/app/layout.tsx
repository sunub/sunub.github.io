import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/Resgistry/";
import React from "react";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { LIGHT_COLORS, DARK_COLORS } from "@/constants/constants";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { initSetColorsByThemeFn } from "@/components/Theme/InitTheme/InitThemeValue";

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
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const saved = (await cookies()).get("color-theme");
  const theme = saved?.value === "dark" ? "dark" : "light";
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
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=1"
        ></meta>
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/assets/favicon.ico"
        />
        <link
          rel="preload"
          href="/assets/clouds.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/bridge.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/cars.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/dark_clouds.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/dark_bridge.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/assets/dark_cars.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        <Script id="theme-script" strategy="beforeInteractive">
          {`(${initSetColorsByThemeFn})()`}
        </Script>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "sun_ub",
              url: "https://sunub.vercel.app",
              description: "디자인과 개발을 좋아합니다.",
            }),
          }}
        ></script>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <div id="__next">
              <Header />
              <div className="blog-main__landing-page">{children}</div>
              <Footer />
              <div id="mobile-nav-portal" />
              <div id="blog-search__input-area" />
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
