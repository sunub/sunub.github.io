import React from "react"
import Elevation from "./Elevation"
import * as Icons from "@/components/Header/icon/Icons"

type IconName = "web" | "code" | "cs" | "algo" | "logo";

function NgIcons({ usage }: { usage: IconName }) {
    switch (usage) {
        case ("web"):
            return <Icons.Web />
        case ("code"):
            return <Icons.Code />
        case ("cs"):
            return <Icons.CS />
        case ("algo"):
            return <Icons.Algo />
        default:
            return <Icons.BirdLogo />
    }
}

export default function NgContent({ usage }: { usage: IconName }) {
    return (<>
        <Elevation $size={64} $distance='none' $usage='others'>
            <NgIcons usage={usage} />
        </Elevation>
    </>)
}