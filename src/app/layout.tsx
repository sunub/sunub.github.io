import "@/app/globals.css"
import React from "react"
import Header from "../components/Header/index"
import { Metadata } from "next"
import Provider from "@/components/Provider"
import InitTheme from "@/components/InitTheme"

export const metadata: Metadata = {
  title: {
    default: "sun_ub",
    template: "%s | sun_ub",
  },
  keywords: ["sunub", "sun_ub"],
  description: "This site is sunub's personal blog ",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="kor" suppressHydrationWarning={true} >
      <head>
        <link href="/fonts/NanumSquareNeo-Variable.ttf" rel="stylesheet" as="font" type="text/css" />
        <link href="/fonts/NanumSquareNeo-eHv.ttf" rel="stylesheet" as="font" type="text/css" />
        <link href="/fonts/NanumSquareNeo-cBd.ttf" rel="stylesheet" as="font" type="text/css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet preload" as="style" />
        <link rel="stylesheet" href="//fonts.googleapis.com/css2?family=Material+Icons&amp;family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&amp;display=block" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" as="icon" />
        <InitTheme />
      </head>
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}