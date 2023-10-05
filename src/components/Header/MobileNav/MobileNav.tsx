import HamburgerBtn from "./HamburgerBtn"
import NavigationMenu from "./Navigation/index"
import styles from "./MobileNav.module.css";
import React from "react"
import Title from "./Title";

export default function MobileNav({ children }: { children: React.ReactNode }) {
    return (
        <div id="mobile-nav" className={styles.MobileMenu}>
            <header className={styles.MobileHeader}>
                <Title />
                <HamburgerBtn />
                <NavigationMenu>
                    {children}
                </NavigationMenu>
            </header>
        </div>
    )
}