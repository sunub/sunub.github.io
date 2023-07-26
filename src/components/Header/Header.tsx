import HeaderLeft from "./HeaderLeft/index";
import HeaderRight from "./HeaderRight/index";
import HeaderProvider from "./Header.context";
import MobileMenu from "./MobileMenu/index";
import styles from './Header.module.css';
import MenuContent from "./MobileMenu/MenuContent/MenuContent";
import ThemeToggler from "../Theme/ThemeToggler";
import React from "react";

const SiteHeader = () => {
	return (
		<HeaderProvider>
			<div className={styles.HeaderContainer} >
				<HeaderLeft />
				<HeaderRight />
				<MobileMenu>
					<MenuContent>
						<ThemeToggler />
					</MenuContent>
				</MobileMenu>
			</div>
		</HeaderProvider>
	);
};

export default SiteHeader;
