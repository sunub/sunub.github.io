import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/Resgistry/";
import React from "react";
import InitTheme from "@/components/Theme/InitTheme";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import clsx from "clsx";

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
  variable: "--pretendard",
});

const nanumRound = localFont({
  src: "../../public/fonts/NanumSquareRoundR.woff2",
  display: "swap",
  style: "normal",
  variable: "--nanum-round",
});

const nanumRoundBold = localFont({
  src: "../../public/fonts/NanumSquareRoundB.woff2",
  display: "swap",
  style: "normal",
  variable: "--nanum-round-bold",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={clsx([
        nanumRoundBold.variable,
        nanumRound.variable,
        pretendard.variable,
      ])}
      suppressHydrationWarning={true}
    >
      <head>
        <meta charSet="utf-8" />
        <meta content="text/html" charSet="<characterset>" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=1"
        />
        <meta name="theme-color" content="" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet preload"
          as="style"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/assets/favicon.ico"
          as="icon"
        />
        <InitTheme />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <div id="__next">
              <div id="blog-main__header-wrapper">
                <Header />
              </div>
              <div className="blog-main__landing-page">{children}</div>
              <Footer />
              <div id="mobile-nav-portal" />
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
