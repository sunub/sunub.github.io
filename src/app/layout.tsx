import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/Resgistry/";
import ThemeProvider from "@/components/Theme/Provider";
// import Header from "@/components/Header";
import Header from "@/components/v2/Header";
import InitTheme from "@/components/Theme/InitTheme";
import MobileNav from "@/components/Header/mobile/MobileNav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import HeaderContents from "@/components/v2/HeaderContents";
import { cookies } from "next/headers";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/constants";
import { Theme } from "type";

export const metadata: Metadata = {
  title: {
    default: "sun_ub",
    template: "%s | sun_ub",
  },
  keywords: ["sunub", "sun_ub"],
  description: "This site is sunub's personal blog ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const savedTheme = cookies().get("color-theme");
  const theme = savedTheme?.value || "light";
  const preferColors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;

  return (
    <html
      lang="ko"
      data-color-theme={theme}
      style={preferColors}
      suppressHydrationWarning={true}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          <div id="__next">
            <div className="blog-main__landing-page">
              <HeaderContents initColorTheme={theme} />
              <MobileNav />
              <div id="side-ng__main-content">
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}

// container: root / inline-size;

// display: grid;
// grid-template-columns: [side-header] 96px [main-content] 1fr;
// grid-template-rows: 1fr;

// transition: grid-template-columns 300ms cubic-bezier(0.3, 0.7, 0.4, 1);

// @media screen and (max-width: 768px) {
//   grid-template-columns: [main-content] 1fr;
//   grid-template-rows: 1fr;
// }
