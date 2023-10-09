"use client"

import styles from "./MobileNav.module.css";
import React from "react"
import Title from "./Title";
import Hamburger from "../Hamburger";
import Navigation from "./Navigation";
import MenuContent from "./MenuContent";

export default function MobileNav({ children }: { children: React.ReactNode }) {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <div id="mobile-nav" className={styles.MobileMenu}>
            <header className={styles.MobileHeader}>
                <Title />
                <Hamburger isOpen={isOpen} setOpen={setOpen} />
                <Navigation isOpen={isOpen} setOpen={setOpen}>
                </Navigation>
                <MenuContent />
                {/* <NavigationMenu>
                    {children}
                </NavigationMenu> */}
            </header>
        </div>
    )
}