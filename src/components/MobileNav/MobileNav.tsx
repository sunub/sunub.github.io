import React from "react";
import Navigation from "./Navigation";
import Post from "@/utils/Post";
<<<<<<< HEAD
=======
import useColorTheme from "@/hooks/use-colorTheme";
>>>>>>> refs/remotes/origin/sunub

async function MobileNav() {
  const post = new Post();
  const categories = post.categories;
<<<<<<< HEAD

  return (
    <div id="mobile-nav-portal">
      <Navigation categories={categories} />
=======
  const colorTheme = await useColorTheme();

  return (
    <div id="mobile-nav-portal">
      <Navigation categories={categories} colorTheme={colorTheme} />
>>>>>>> refs/remotes/origin/sunub
    </div>
  );
}

export default MobileNav;
