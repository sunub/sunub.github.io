import HamburgerBtn from "./HamburgerBtn"
import NavigationMenu from "./Navigation/index"
import styles from "./MobileNav.module.css"
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