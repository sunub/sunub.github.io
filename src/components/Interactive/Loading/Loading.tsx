"use client"

import React from "react"
import Animation from "./Animation/index"
import Button from "./Button/index"

export default function Loading() {
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    return (<>
        <Animation btnRef={buttonRef} />
        <Button ref={buttonRef} />
    </>)
}