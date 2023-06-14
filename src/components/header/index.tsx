"use client"

import SearchBtn from "./web/search"
import Cluster from "./web/cluster"
import BookNavBar from "./mobile/booknavbar"
import { useEffect } from "react"

export default function WebHeader() {
    useEffect(() => {
        if (!customElements.get("web-header") && !customElements.get("web-navigation-drawer")) {
            import("./customElement")
        }
    }, [])

    return (
        <>
            <web-header>
                <Cluster />
                <SearchBtn />
            </web-header>
            <BookNavBar />
        </>
    )
}
