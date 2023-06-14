"use client"

import { useEffect, useState } from "react"

type StorageInfo = {
    [key: string]: string[];
};

export default function NavigationDrawer() {
    const [storageData, setStorageData] = useState<StorageInfo>({})

    const navInfo = [{
        dataLabel: "Tab : Develop",
        url: "/develop",
        title: "Develop",
        key: "Develop Page"
    },
    {
        dataLabel: "Tab : Devops",
        url: "/devops",
        title: "DevOps",
        key: "Devops Page"
    },
    {
        dataLabel: "Tab : Devkit",
        url: "/devkit",
        title: "DevKit",
        key: "Devkit Page"
    }]

    useEffect(() => {
    }, [])

    return (
        <>
            <web-navigation-drawer type="standard">
                <nav aria-label="main navigator" className="site-header__nav" data-drawer-container={""} aria-expanded={false}>
                    {/* {
                        navInfo.map((info) => {
                            return (
                                <div
                                    key={info.title}
                                    className="tabs-wrapper"
                                    onMouseLeave={(event) => {
                                        const curTarget = event.currentTarget

                                        document.querySelectorAll(".tab").forEach(tab => {
                                            if (curTarget.contains(tab)) {
                                                tab.setAttribute("aria-expanded", "false")
                                            }
                                        })
                                        document.querySelectorAll(".tab-dropdown-column").forEach(dropdownMenu => {
                                            if (curTarget.contains(dropdownMenu)) {
                                                dropdownMenu.removeAttribute("dropdown--open")
                                            }
                                        })
                                        document.querySelectorAll(".tabs-dropdown-toggle").forEach(dropdownToggle => {
                                            if (curTarget.contains(dropdownToggle)) {
                                                dropdownToggle.setAttribute("aria-expanded", "false")
                                            }
                                        })
                                    }}
                                >
                                    <DropdownMenu
                                        url={info.url}
                                        title={info.title}
                                        dataLabel={info.dataLabel}
                                        class={"site-header__link"}
                                        category="Site-Wide Custom Events"
                                        content={[...Object.keys(storageData)]}
                                    />
                                </div>
                            )
                        })
                    } */}
                </nav>
            </web-navigation-drawer>
        </>
    )
}
