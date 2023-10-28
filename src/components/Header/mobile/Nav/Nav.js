"use client";

import styles from "./Nav.module.css";
import React from "react";
import Title from "../Title";
import Hamburger from "../Hamburger";
import BackDrop from "../BackDrop";
import Toggler from "@/components/Theme/Toggler";
import Menu from "../Menu";

function Nav({ categories }) {
	const [isOpen, setOpen] = React.useState(false);
	return (
		<header className={styles.MobileHeader}>
			<Title />
			<Hamburger isOpen={isOpen} setOpen={setOpen} />
			<BackDrop isOpen={isOpen} setOpen={setOpen} />
			<div className="mobile-menu__wrapper">
				<Menu
					isOpen={isOpen}
					setOpen={setOpen}
					categories={categories}
				/>
				<Toggler id={"mobile-header__theme-toggler"} maskId={"mobile-nav__theme-toggler"} />
			</div>
		</header>
	);
}

export default Nav;
