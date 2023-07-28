import HeaderLeft from "./HeaderLeft/index";
import HeaderRight from "./HeaderRight/index";
import styles from './Header.module.css';
import React from "react";

const SiteHeader = () => {
	return (
		<div className={styles.HeaderContainer} >
			<HeaderLeft />
			<HeaderRight />
		</div>
	);
};

export default SiteHeader;
