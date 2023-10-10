"use client";

import styles from "./Wrapper.module.css";
import React from "react";
import Title from "../Title";
import Hamburger from "../Hamburger";
import BackDrop from "../BackDrop";

function Wrapper({ children }) {
	const [isOpen, setOpen] = React.useState(false);
	// const childrenWithProps = React.Children.map(children, (child) => {
	// 	if (React.isValidElement(child) && child === children[0]) {
	// 		return React.cloneElement(child, {
	// 			isOpen: isOpen,
	// 			setOpen: setOpen,
	// 		});
	// 	}
	// });

	return (
		<header className={styles.MobileHeader}>
			<Title />
			<Hamburger isOpen={isOpen} setOpen={setOpen} />
			<BackDrop isOpen={isOpen} setOpen={setOpen} />
			{children}
		</header>
	);
}

export default Wrapper;
