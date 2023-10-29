import './globals.css'
import type { Metadata } from 'next';
import StyledComponentsRegistry from "@/components/Resgistry/";
import ThemeProvider from "@/components/Theme/Provider";
import Header from "@/components/Header";
import InitTheme from "@/components/Theme/InitTheme";
import MobileNav from "@/components/Header/mobile/MobileNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: 'sun_ub',
    template: '%s | sun_ub',
  },
  keywords: ['sunub', 'sun_ub'],
  description: "This site is sunub's personal blog ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning={true} >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet preload"
          as="style"
        />
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/assets/favicon.ico" as="icon" />
        <style dangerouslySetInnerHTML={{
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
        `}} />
        <style>
          {
            `
            html{
              --scrollbar-width: 12px;
              --scrollbar-height: 12px;
              --scrollbar-background-color: oklch(92.54% 0.01 32.52);
              --scrollbar-thumb-color: oklch(45.88% 0.029 30.71);
              --pink-0: #fdeeeb;
              --pink-1: rgba(243, 162, 145, 100%);
              --pink-2: oklch(78.78% 0.1 32.39);
              --pink-3: rgba(243, 162, 145, 17%);
              --pink-4: oklch(70.8% 0.165 32.85 / 0.7);
              --pink-5: oklch(70.8% 0.165 32.85);
          
              --gray-1: oklch(54.74% 0.023 238.99);
              --gray-2: oklch(34% 0.019 229.64);
              --gray-3: oklch(64.86% 0.181 249.54);

              --scrollbar-width: 12px;
              --scrollbar-height: 12px;
              --scrollbar-background-color: oklch(92.54% 0.01 32.52);
              --scrollbar-thumb-color: oklch(45.88% 0.029 30.71);
              
              --mid-shadow: 0px 4px 8px 3px oklch(0% 0 11 / 0.15),
              0px 1px 3px 0px oklch(0% 0 11 / 0.3);
              --short-shadow: 0px 1px 2px 0px oklch(0% 0 11 / 0.3),
              0px 1px 3px 1px oklch(0% 0 11 / 0.15);
              --long-shadow: 0px 8px 12px 6px oklch(0% 0 11 / 0.15),
              0px 4px 4px 0px oklch(0% 0 11 / 0.3);
              --none-shadow: none;
          
              --higlight-border-color: oklch(73.44% 0.152 21.47);
              --default-border-color: oklch(61.8% 0.027 30.58 / 0.3);
          
              --default-bg-color: oklch(97.14% 0.011 31.07);
              --card-content-bg-color: oklch(98.8% 0 31.07);
            }
            `
          }
        </style>
        <InitTheme />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <div id="__next">
              <MobileNav />
              <Header />
              {children}
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
