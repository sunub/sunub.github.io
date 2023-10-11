"use client";

import styles from "./Wrapper.module.css";
import React from "react";
import Title from "../Title";
import Hamburger from "../Hamburger";
import BackDrop from "../BackDrop";

function Wrapper({ children }) {
	const [isOpen, setOpen] = React.useState(false);

	return (
		<header className={styles.MobileHeader}>
			<Title />
			<Hamburger isOpen={isOpen} setOpen={setOpen} />
			<BackDrop isOpen={isOpen} setOpen={setOpen} />
			<div className="mobile-menu__wrapper">{children}</div>
		</header>
	);
}

export default Wrapper;
