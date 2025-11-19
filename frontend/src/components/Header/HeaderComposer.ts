import { Search } from "@/widgets/Search";
import { HeaderLayout } from "./HeaderLayout";
import { HeaderLeftSide } from "./HeaderLeftSide";
import { HeaderRightSide } from "./HeaderRightSide";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Hamburger from "../MobileNav/Hamburger";
import { ThemeToggler } from "../Theme/Toggler/ThemeToggler";

const Composer = {
  layout: HeaderLayout,
  leftSide: HeaderLeftSide,
  rightSide: HeaderRightSide,
  logo: Logo,
  navigation: Navigation,
  search: Search,
  hamburger: Hamburger,
  themeToggler: ThemeToggler
}

export const HeaderComposer = Object.freeze(Composer);