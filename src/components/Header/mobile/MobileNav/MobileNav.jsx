import styles from "./MobileNav.module.css";
import React from "react";
import Wrapper from "./Wrapper";
import Menu from "./Menu";
import ThemeToggler from "@/components/Theme/ThemeToggler";

export default function MobileNav() {
	return (
		<div id="mobile-nav" className={styles.MobileMenu}>
			<Wrapper>
				<Menu />
				<ThemeToggler maskId={"mobile-nav__theme-toggler"} />
			</Wrapper>
		</div>
	);
}
