import HeaderLeft from "./HeaderLeft/index";
import HeaderRight from "./HeaderRight/index";
import styles from './Header.module.css';
import React from "react";

const SiteHeader = () => {
	return (
		<div id="side-ng__header-content" className={styles.HeaderContainer} >
			<form>
				<HeaderLeft />
				<HeaderRight />
			</form>
		</div>
	);
};

export default SiteHeader;
