"use client"

import BookNavBar from "./mobile/booknavbar"
import { lazy } from "react"
import SearchBtn from "./web/search"
import Cluster from "./web/cluster"

const WebHeader = lazy(() => import("./webHeader"))

export default function Header() {

    return (
        <>
            <WebHeader />
        </>
    )
}
