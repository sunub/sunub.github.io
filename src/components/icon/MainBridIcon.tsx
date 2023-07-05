"use client"

import { DayBirdIcon, NightBirdIcon } from "@/components/icon/BirdIcon"
import { LargeDayCloud, LargeNightCloud, SmallNightCloud, SmallDayCloud } from "@/components/icon/Cloud"
import { useContext } from "react"
import { ThemeContext } from "../Theme/Provider"

export default function MainBirdIcon() {
    const theme = useContext(ThemeContext)

    return (<>
        <div className="main__icon" >
            {theme.colorMode === "light"
                ? <>
                    <LargeDayCloud />
                    <DayBirdIcon />
                    <SmallDayCloud />
                </>
                : <>
                    <LargeNightCloud />
                    <NightBirdIcon />
                    <SmallNightCloud />
                </>
            }
        </div>
    </>)
}