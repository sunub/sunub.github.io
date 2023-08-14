import HamburgerBtn from "./HamburgerBtn"
import NavigationMenu from "./Navigation/index"
import React from "react"

export default function MobileNav({ children }: { children: React.ReactNode }) {
    return (
        <div id="mobile-nav">
            <HamburgerBtn />
            <NavigationMenu>
                {children}
            </NavigationMenu>
        </div>
    )
}