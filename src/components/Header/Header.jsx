import HeaderRight from "./HeaderRight";
import styles from "./Header.module.css";
import React from "react";
import LogoDrawer from "./LogoDrawer";

const SiteHeader = () => {
	return (
		<div id="side-ng__header-content" className={styles.HeaderWrapper}>
			<div className={styles.HeaderContainer}>
				<LogoDrawer />
				<HeaderRight />
			</div>
		</div>
	);
};

export default SiteHeader;
