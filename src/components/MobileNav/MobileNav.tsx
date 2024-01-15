import React from "react";
import Navigation from "./Navigation";
import Post from "@/utils/Post";

async function MobileNav() {
  const post = new Post();
  const categories = post.categories;

  return (
    <div id="mobile-nav-portal">
      <Navigation categories={categories} />
    </div>
  );
}

export default MobileNav;
