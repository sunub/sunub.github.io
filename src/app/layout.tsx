import "@/app/globals.scss"
import React from "react"
import localFont from "@next/font/local"
import Header from "../components/header/index"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "sun_ub",
    template: "%s | sun_ub",
  },
  keywords: ["sunub", "sun_ub"],
  description: "This site is sunub's personal blog ",
}

// const nanumSquareNeo = localFont({
//   src: "/fonts/NanumSquareNeo-Variable.ttf",
//   variable: "--nanum-squareNeo",
// });

// const nanumSquareNeoBold = localFont({
//   src: "/fonts/NanumSquareNeo-cBd.ttf",
//   variable: "--nanum-squareNeo-bold",
// });

// const nanumSquareNeoHeavy = localFont({
//   src: "/fonts/NanumSquareNeo-eHv.ttf",
//   variable: "--nanum-squareNeo-heavy",
// });


export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="kor"  >
      <head>
        <link href="/fonts/NanumSquareNeo-Variable.ttf" rel="stylesheet" as="font" type="text/css" />
        <link href="/fonts/NanumSquareNeo-eHv.ttf" rel="stylesheet" as="font" type="text/css" />
        <link href="/fonts/NanumSquareNeo-cBd.ttf" rel="stylesheet" as="font" type="text/css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet preload" as="style" />
        <link rel="stylesheet" href="//fonts.googleapis.com/css2?family=Material+Icons&amp;family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&amp;display=block" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" as="icon" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}