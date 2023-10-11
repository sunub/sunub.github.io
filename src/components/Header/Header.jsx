import HeaderRight from "./HeaderRight";
import styles from "./Header.module.css";
import React from "react";
import LogoDrawer from "./LogoDrawer";
import { getBaseUrl } from "@/utils/getBaseUrl.mjs";

const SiteHeader = async () => {
	const baseURL = await getBaseUrl();
	return (
		<div id="side-ng__header-content" className={styles.HeaderWrapper}>
			<div className={styles.HeaderContainer}>
				<LogoDrawer baseURL={baseURL} />
				<HeaderRight />
			</div>
		</div>
	);
};

export default SiteHeader;
