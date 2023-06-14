"use client"

import Image from "next/image"
import { Home, Algorithm } from "@/icon"
import React, { FormEvent, useEffect, useState, createContext } from "react"

export default function Asidemenu() {
    const [url, setUrl] = useState("all")
    const [urlIndex, setUrlIndex] = useState(0)

    return (<>
        <form onChange={(event) => {
            const curr = event.target as HTMLInputElement
            const changedUrl = curr.value
            setUrl(changedUrl)
        }} className="main_aside">
            <label htmlFor="all">
                <Home />
                <p>All</p>
                <input defaultChecked type="radio" id="all" name="topics" value="all" />
            </label>
            <label htmlFor="web">
                <Image
                    src={"/icon_web.png"}
                    width={24}
                    height={24}
                    alt="Icon Web"
                />
                <p>web</p>
                <input type="radio" id="web" name="topics" value="web" />
            </label>
            <label htmlFor="algorithm">
                <Algorithm />
                <p>algorithm</p>
                <input type="radio" id="algorithm" name="topics" value="algorithm" />
            </label>
            <label htmlFor="javascript">
                <Image
                    src={"/icon_javascript.png"}
                    width={24}
                    height={24}
                    alt="Icon Javascript"
                />
                <p>javascript</p>
                <input type="radio" id="javascript" name="topics" value="javascript" />
            </label>
            <label htmlFor="typescript">
                <Image
                    src={"/icon_typescript.png"}
                    width={24}
                    height={24}
                    alt="Icon Typescript"
                />
                <p>tysescript</p>
                <input type="radio" id="typescript" name="topics" value="typescript" />
            </label>
        </form>
    </>)
}