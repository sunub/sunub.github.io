import "@/app/globals.css"
import React from "react"
import { nanumSquareNeo, nanumSquareNeoBold, nanumSquareNeoHeavy } from "@/styles/fonts"
import Header from "../components/header/index"
import { Metadata } from "next"
import { baseURL } from "@/lib/getBaseUrl"
import getPost from "@/lib/getPost"

export const metadata: Metadata = {
  title: {
    default: "sun_ub",
    template: "%s | sun_ub",
  },
  keywords: ["sunub", "sun_ub"],
  description: "This site is sunub's personal blog ",
}

async function getPostData() {
  const blogpost = await getPost()

  const req = await fetch(`${baseURL}/api/redis`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    next: {
      revalidate: 60
    }
    // body : JSON.stringify(blogpost)
  })

  return blogpost
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const a = getPostData()

  return (
    <html lang="kor" className={`${nanumSquareNeo.variable} ${nanumSquareNeoBold.variable} ${nanumSquareNeoHeavy.variable}`} >
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet" as="style" />
        <link rel="stylesheet" href="//fonts.googleapis.com/css2?family=Material+Icons&amp;family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&amp;display=block" as="style" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" as="icon" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}