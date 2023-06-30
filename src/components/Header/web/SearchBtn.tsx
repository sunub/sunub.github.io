"use client"

import { useEffect, useState, useRef } from "react"
import { SearchIcon } from "@/components/icon"

export default function SearchBtn() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputOpenEvent, setInputOpenEvent] = useState<HTMLElement>()
    const [inputOpenStatus, setInputOpenStatus] = useState<boolean>(false)

    useEffect(() => {
        setInputOpenEvent(inputOpenEvent => {
            inputOpenEvent = document.querySelector(".site-search__input-wrapper") as HTMLElement
            return inputOpenEvent
        })
    }, [])

    useEffect(() => {
        if (inputOpenStatus) {
            inputRef.current?.focus()
        }
    }, [inputOpenStatus])

    return (
        <div className="site-search-wrapper">
            <button
                className="site-header__search-open-btn"
                aria-label="Open Search"
                onClick={() => {
                    const isExpanded = inputOpenEvent?.getAttribute("aria-expanded")
                    if (isExpanded == "false") {
                        inputOpenEvent?.setAttribute("aria-expanded", "true")
                        const webNavDrawer = document.querySelector("web-navigation-drawer")
                        webNavDrawer?.setAttribute("hidden", "")

                        const searchOpenBtn = document.querySelector(".site-header__search-open-btn")
                        searchOpenBtn?.setAttribute("hidden", "")
                        setInputOpenStatus(true)
                    }
                }}
            >
                <SearchIcon />
            </button>
            <div
                className="site-search__input-wrapper"
                aria-expanded={false}
            >
                <input
                    ref={inputRef}
                    id="site-search__input"
                    className="site-search__input"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    role="searchbox"
                    placeholder="Search"
                    onBlur={() => {
                        if (inputOpenStatus) {
                            inputOpenEvent?.setAttribute("aria-expanded", "false")
                            const webNavDrawer = document.querySelector("web-navigation-drawer")
                            webNavDrawer?.removeAttribute("hidden")
                            const searchOpenBtn = document.querySelector(".site-header__search-open-btn")
                            searchOpenBtn?.removeAttribute("hidden")

                            setInputOpenStatus(false)
                        }
                    }}
                />
            </div>
        </div>
    )
}