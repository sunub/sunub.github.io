"use client"

import { LightTheme, NightTheme } from "@/components/icon/ColorThemeIcon"
import { useEffect, useContext } from "react"
import { ThemeContext } from "@/components/Provider"

type Theme = {
    colorMode?: string | null
    setColorMode?: (value: string) => void
}

export default function ThemeToggler() {
    const theme: Theme = useContext(ThemeContext)

    return (
        <button
            className="theme-toggle"
            id="theme-toggle"
            title="Toggles light & dark"
            aria-label="auto"
            onClick={() => {
                const curTheme: string = theme.colorMode === "light" ? "dark" : "light"
                if (theme.setColorMode) {
                    theme.setColorMode(curTheme)
                }
            }}
        >
            {
                theme.colorMode === "light" ? <LightTheme /> : <NightTheme />
            }
        </button>
    )
}