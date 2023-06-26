"use client"

import { baseURL } from "@/utils/getBaseUrl"
import Image from "next/image"
import { PostCardContext } from "../postcardContext"
import React, { FormEvent, useContext } from "react"


export default function Asidemenu() {
    const { setCategory } = useContext(PostCardContext)

    async function sendCategory(event: FormEvent) {
        const curr = event.target as HTMLInputElement
        const changedCategory = curr.value

        setCategory(changedCategory)
    }

    return (<>
        <form onChange={async (event) => {
            await sendCategory(event)
        }} className="main_aside">
            <label htmlFor="all">
                <Image
                    src={"/icon_home.png"}
                    width={24}
                    height={24}
                    alt="Icon Home"
                />
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
                <Image
                    src={"/icon_algorithm.png"}
                    width={24}
                    height={24}
                    alt="Icon algorithm"
                />
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