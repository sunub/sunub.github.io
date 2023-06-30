"use client"

import { useState, useEffect } from "react"
import DropdownMenu from "../web/dropdownMenu"

type NavInfo = {
    dataLabel: string,
    url: string,
    title: string,
    key?: string,
    data?: string[]
}

export default function NavTop() {
    const [storageData, setStorageData] = useState<Map<string, NavInfo>>(new Map())


    useEffect(() => {
        const navInfo: NavInfo[] = [{
            dataLabel: "Tab : Algorithms",
            url: "/algorithms",
            title: "algorithms",
            key: "",
        },
        {
            dataLabel: "Tab : JS",
            url: "/javascript",
            title: "Javascript",
            key: "",
        },
        {
            dataLabel: "Tab : Typescript",
            url: "/typescript",
            title: "typescript",
            key: "",
        }]
    }, [])


    return (
        <div className="web-mobile-nav-top" data-drawer-container={""}>
            <ul>
                {
                    [...storageData.values()].map((navCmp) => {
                        return (
                            <div
                                key={navCmp.title}
                                className="tabs-wrapper"
                            >
                                <DropdownMenu
                                    url={navCmp.url}
                                    title={navCmp.title}
                                    dataLabel={navCmp.dataLabel}
                                    category="Site-Wide Custom Events"
                                    FSData={navCmp.data!}
                                />
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}