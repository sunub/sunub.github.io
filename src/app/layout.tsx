import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/Resgistry/";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import MobileNav from "@/components/MobileNav";
import InitTheme from "@/components/Theme/InitTheme";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import Header from "@/components/Header";
import Wave from "@/components/HeaderContents/Wave";
import Footer from "@/components/Footer";
import HeroImage from "@/components/HeroImage";
import Blog from "@/db/blog";

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
              --color-navlink: oklch(42.14% 0.08 29.36); 
              --color-text: oklch(21.08% 0.055 34.69); --color-background: oklch(97.14% 0.011 31.07); --color-primary: oklch(100% 0 0 / 0.8); 
              --color-highlight: oklch(70.8% 0.165 32.85); --color-header: oklch(90.8% 0.046 29.64); 
              --color-icon: oklch(61.8% 0.027 30.58); 
              --color-elevation: oklch(100% 0 0); 
              --color-bird: oklch(73.44% 0.152 21.47); 
              --color-thumb: oklch(92.54% 0.01 32.52); --color-thumb-background: oklch(53.74% 0.029 30.1); --color-frontWave: oklch(97.14% 0.011 31.07); --color-midStart: oklch(93.91% 0.026 32.24); --color-midStop: oklch(87.16% 0.067 29.88); --color-endStart: oklch(91.76% 0.034 31.16); --color-endStop: oklch(89.29% 0.054 18.22); --color-landscape: linear-gradient(1deg, oklch(97.14% 0.011 31.07) 21.41%, oklch(82.9% 0.09573202406959574 31.111262465234525 / 68%) 55.11%); 
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
          font-family: Bariol_serif, Wotfard, NanumSquareNeo, sans-serif;
          color: var(--color-text);
          min-height: 100vh;
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
