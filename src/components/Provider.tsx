"use client"
import React, { useEffect, useState, createContext } from "react";

type Theme = {
    colorMode?: string | null
    setColorMode?: (value: string) => void
}

export const ThemeContext = createContext<Theme>({})

export default function Provider({ children }: { children: React.ReactNode }) {
    const [colorMode, rawSetColorMode] = useState<string | null>(null)

    useEffect(() => {
        const root = document.documentElement
        const initColorValue = root.getAttribute("data-color-mode")
        rawSetColorMode(initColorValue)
    }, [])

    const setColorMode = (value: string) => {
        rawSetColorMode(value)
        if (window && window.document.firstElementChild) {
            window.document.firstElementChild?.setAttribute("data-color-mode", value)
        }
        localStorage.setItem("theme-preference", value)
    }

    return (
        <ThemeContext.Provider value={{ colorMode, setColorMode }}>
            {children}
        </ThemeContext.Provider>
    )
}