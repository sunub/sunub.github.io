import React from "react";
import Navigation from "./Navigation";
import Post from "@/utils/Post";
import useColorTheme from "@/hooks/use-colorTheme";

async function MobileNav() {
  const post = new Post();
  const categories = post.categories;
  const colorTheme = await useColorTheme();

  return (
    <div id="mobile-nav-portal">
      <Navigation categories={categories} colorTheme={colorTheme} />
    </div>
  );
}

export default MobileNav;
