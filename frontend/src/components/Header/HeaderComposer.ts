import { Search } from "@/widgets/Search";
import Hamburger from "../MobileNav/Hamburger";
import { ThemeToggler } from "../Theme/Toggler/ThemeToggler";
import { Archive } from "./Archive";
import { HeaderLayout } from "./HeaderLayout";
import { HeaderLeftSide } from "./HeaderLeftSide";
import { HeaderRightSide } from "./HeaderRightSide";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Composer = {
	layout: HeaderLayout,
	leftSide: HeaderLeftSide,
	rightSide: HeaderRightSide,
	logo: Logo,
	navigation: Navigation,
	search: Search,
	hamburger: Hamburger,
	themeToggler: ThemeToggler,
	archive: Archive,
};

export const HeaderComposer = Object.freeze(Composer);
