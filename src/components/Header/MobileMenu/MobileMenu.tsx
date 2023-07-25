import HamburgerBtn from "../HeaderRight/HamburgerBtn"
import NavigationMenu from "./Navigation/index"
import MenuContent from "./MenuContent/index"
import styles from "./MobileMenu.module.css"
import React from "react"

export default function MobileMenu({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.MobileMenu}>
            <HamburgerBtn />
            <NavigationMenu>
                {children}
            </NavigationMenu>
        </div>
    )
}