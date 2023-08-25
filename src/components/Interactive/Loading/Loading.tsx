"use client"

import React from "react"
import Animation from "./Animation/index"
import Button from "./Button/index"
import AnimationProvider from "./Loading.context"

export default function Loading() {

    return (
        <AnimationProvider>
            <Animation />
            <Button />
        </AnimationProvider>
    )
}