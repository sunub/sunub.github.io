import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/Resgistry/";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import MobileNav from "@/components/MobileNav";
import InitTheme from "@/components/Theme/InitTheme";
import ThemeProvider from "@/components/Theme/ThemeProvider";
<<<<<<< HEAD
import Wave from "@/components/HeaderContents/Wave";
import Header from "@/components/Header";
import HeroImage from "@/components/HeroImage";
import Footer from "@/components/Footer";
=======
import Header from "@/components/Header";
import Wave from "@/components/HeaderContents/Wave";
import Footer from "@/components/Footer";
import HeroImage from "@/components/HeroImage";
>>>>>>> sunub

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <meta content="text/html" charSet="<characterset>" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=1"
        />
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
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: 'NanumSquareNeo';
            src: url('/fonts/NanumSquareNeo-Variable.woff2') format('woff2'),
            font-style: normal;
            font-display: fallback;
            unicode-range: U+AC00-D7AF;
          }
          @font-face {
            font-family: 'Wotfard';
            src: url('/fonts/wotfard-regular-webfont.woff2') format('woff2'),
            font-weight: 900;
            font-style: normal;
            font-display: fallback;
            uniconde-range: U+0020-007E;
          }
          @font-face {
            font-family: 'Bariol_serif';
            src: url('/fonts/bariol_serif_regular-webfont.woff2') format('woff2'),
            font-style: normal;
            font-display: fallback;
            uniconde-range: U+0020-007E;
          }
        `,
          }}
        />
        <style>
          {`
            html{
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
            line-height: calc(1em + 0.8rem);
            -webkit-font-smoothing: antialiased;
          }
          *,
          *::before,
          *::after {
            box-sizing: border-box;
        }

        body {
          font-family: Bariol_serif, Wotfard, NanumSquareNeo, sans-serif;
          color: var(--color-text);
          min-height: 100vh;
          background: var(--color-background);
        }

        #__next {
          isolation: isolate;
        }

            `}
        </style>
        <InitTheme />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <div id="__next">
<<<<<<< HEAD
              <div id="blog-header__root-wrapper">
=======
              <div id="blog-main__header-wrapper">
>>>>>>> sunub
                <Header />
                <Wave />
              </div>
              <div className="blog-main__landing-page">{children}</div>
              <Footer />
            </div>
            <Analytics />
            <MobileNav />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
