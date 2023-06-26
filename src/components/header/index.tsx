"use client"

import BookNavBar from "./mobile/booknavbar"
import { lazy } from "react"
import SearchBtn from "./web/search"
import Cluster from "./web/cluster"
import WebHeader from "./webHeader"

export default function Header() {

    return (
        <>
            <WebHeader />
            <BookNavBar />
        </>
    )
}
