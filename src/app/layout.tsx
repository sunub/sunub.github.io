import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/Resgistry/";
import React from "react";
import InitTheme from "@/components/Theme/InitTheme";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import Wave from "@/components/HeaderContents/Wave";
import HeroImage from "@/components/HeroImage";

const nanumFont = localFont({
  src: "../../public/fonts/NanumSquareNeo-Variable.woff2",
  display: "swap",
  variable: "--nanum-square-neo",
  preload: true,
});

const barialFont = localFont({
  src: "../../public/fonts/bariol_serif_regular-webfont.woff2",
  display: "swap",
  variable: "--bariol-serif",
  preload: true,
});

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning={true}
      className={clsx([nanumFont.className, barialFont.className])}
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
        <style>
          {`
            html{
              --color-light-heroimage: 1; 
              --color-dark-heroimage: 0;
              --scrollbar-width: 12px;
              --scrollbar-height: 12px;
              --color-birdWing: oklch(50.89% 0.054 232.07);
              --color-birdBody: oklch(26.29% 0.026 216.39);
              --color-birdBeak: oklch(72.63% 0.045 233.48);
              --color-birdEyeball: oklch(88.53% 0 0);
              --color-birdShadow: oklch(33.71% 0.06084120684331697 236.3806640420637 / 82.55%);
            }

            * {
            margin: 0px;
            line-height: calc(1em + .9rem);
            -webkit-font-smoothing: antialiased;
          }
          *,
          *::before,
          *::after {
            box-sizing: border-box;
        }

        body {
          font-family: var(--nanum-square-neo), var(--bariol-serif), sans-serif;
          color: var(--color-text);
          min-height: 100%;
          background: var(--color-background);
        }

            `}
        </style>
        <InitTheme />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <div id="__next">
              <div id="blog-main__header-wrapper">
                <Header />
              </div>
              <div id="blog-main__gradient-background" />
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
