"use client"

import Link from "next/link"
import { MouseEvent, useEffect, useState } from "react"

interface DropDownMenu {
    FSData: string[],
    category: string,
    dataLabel: string,
    url: string,
    title: string,
}

export default function DropdownMenu(navInfo: DropDownMenu) {
    const [tabNodeList, settabNodeList] = useState<NodeListOf<Element>>()
    const [dropDownMenuList, setdropDownMenuList] = useState<NodeListOf<Element>>()
    const [dropDownToggle, setdropDownToggle] = useState<NodeListOf<Element>>()

    useEffect(() => {
        settabNodeList(tabNodeList => {
            tabNodeList = document.querySelectorAll(".tab")
            return tabNodeList
        })
        setdropDownMenuList(dropDownMenuList => {
            dropDownMenuList = document.querySelectorAll(".tab-dropdown-column")
            return dropDownMenuList
        })
        setdropDownToggle(dropdowntoggle => {
            dropdowntoggle = document.querySelectorAll(".tabs-dropdown-toggle")
            return dropdowntoggle
        })
    }, [])

    function openDropMenu(event: MouseEvent) {
        const curTarget = event.target as Node
        tabNodeList?.forEach(tab => {
            const isCurTargetNode = tab.contains(curTarget)
            if (isCurTargetNode) {
                tab.setAttribute("aria-expanded", "true")
            }
        })
        dropDownMenuList?.forEach(dropDownMenu => {
            if (curTarget.parentElement?.contains(dropDownMenu)) {
                dropDownMenu?.setAttribute("dropdown--open", "")
            }
        })
        dropDownToggle?.forEach(dropDownToggle => {
            if (curTarget.parentElement?.contains(dropDownToggle)) {
                dropDownToggle?.setAttribute("aria-expanded", "true")
            }
        })
    }

    return (
        <div
            className="tab"
            aria-expanded={false}
        >
            <a
                href={navInfo.url}
                className={"site-tabs-content"}
                data-label={navInfo.dataLabel}
                data-category={navInfo.category}
                onMouseEnter={(event) => {
                    openDropMenu(event)
                }}
            >
                {navInfo.title}
            </a>
            <div title={"dropdown-wrapper"} className="dropdown-wrapper" >
                <a href={"#"}
                    className={"tabs-dropdown-toggle material-icons"}
                    aria-expanded={false}
                    onMouseEnter={(event) => {
                        openDropMenu(event)
                    }}
                />
                <div
                    className="tab-dropdown-column"
                    onMouseLeave={(event) => {
                        const curTarget = event.target as HTMLElement
                        dropDownMenuList?.forEach(dropDownMenu => {
                            if (curTarget.contains(dropDownMenu)) {
                                dropDownMenu.removeAttribute("dropdown--open")
                            }
                        })
                    }}>
                    <ul
                        className="tab-dropdown-section"
                    >
                        {
                            navInfo.FSData.map((dir) => {
                                return <Link
                                    key={dir}
                                    href={"/"}
                                    className="nav-item"
                                />
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}