import '@/app/globals.css';
import React from 'react';
import Header from '../components/Header/index';
import { Metadata } from 'next';
import ThemeProvider from '@/components/Theme/ThemeProvider';
import InitTheme from "@/components/Toaster/InitTheme"
import StyledComponentsRegistry from '@/lib/registry';
import MobileNav from "@/components/Header/MobileNav/index";
import MobileContent from "@/components/Header/MobileNav/MenuContent/index";
import HeaderProvider from '@/components/Header/Header.context';
import ThemeToggler from '@/components/Theme/ThemeToggler';

export const metadata: Metadata = {
  title: {
    default: 'sun_ub',
    template: '%s | sun_ub',
  },
  keywords: ['sunub', 'sun_ub'],
  description: "This site is sunub's personal blog ",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kor" suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/fonts/NanumSquareNeo-Variable.woff2" rel="stylesheet" as="font" type="text/css" />
        <link href="/fonts/wotfard-regular-webfont.woff2" rel="stylesheet" as="font" type="text/css" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet preload"
          as="style"
        />
        <link
          rel="stylesheet"
          href="//fonts.googleapis.com/css2?family=Material+Icons&amp;family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&amp;display=block"
        />
        <link rel="preload" href="./global.css" as="style" />
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" as="icon" />
        <InitTheme />
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
            }
            `
          }
        </style>
        <style>
          {
            `
            @font-face {
              font-family: "Nanum SquareNeo";
              src: url("/fonts/NanumSquareNeo-Variable.woff2")
                  format('woff2');
            }
            @font-face {
              font-family: "Wotfard";
              src: url("/fonts/fonts/wotfard-regular-webfont.woff2")
                  format('woff2');
            }
            `
          }
        </style>
      </head>
      <body>
        <script src="https://cdn.jsdelivr.net/npm/pathseg@1.2.1/pathseg.min.js" />
        <StyledComponentsRegistry>
          <ThemeProvider>
            <HeaderProvider>
              <MobileNav>
                <MobileContent>
                  <ThemeToggler maskId='mobile-theme-btn' />
                </MobileContent>
              </MobileNav>
            </HeaderProvider>
            <div id='__next'>
              <Header />
              {children}
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
