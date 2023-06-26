"use client"

import SearchBtn from "./web/search"
import Cluster from "./web/cluster"
import { useEffect } from "react"

export default function WebHeader() {
    useEffect(() => {
        if (!customElements.get("web-header") && !customElements.get("web-navigation-drawer")) {
            import("./customElement")
        }
    }, [])

    return (<>
        <div className="site-header" role="banner">
            <Cluster />
            <SearchBtn />
        </div>
    </>)
}