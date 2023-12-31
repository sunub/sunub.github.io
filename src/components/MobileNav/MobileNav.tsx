import React from "react";
import Hamburger from "./Hamburger";
import useToggle from "@/hooks/use-toggle";
import Navigation from "./Navigation";
import Post from "@/utils/Post";
import useColorTheme from "@/hooks/use-colorTheme";

function MobileNav() {
  const post = new Post();
  const categories = post.categories;
  const colorTheme = useColorTheme();

  return (
    <div id="mobile-nav-portal">
      <Navigation categories={categories} colorTheme={colorTheme} />
    </div>
  );
}

export default MobileNav;
