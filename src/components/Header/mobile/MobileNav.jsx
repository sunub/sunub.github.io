import styles from "./MobileNav.module.css";
import React from "react";
import Post from "@/utils/Post";
import Nav from "./Nav/Nav";

export default function MobileNav() {
<<<<<<< HEAD
	const post = new Post();
	const categories = post.categories;

	return (
		<div id="mobile-nav" className={styles.MobileMenu}>
			<Nav categories={categories} />
		</div>
	);
=======
  const post = new Post();
  const categories = post.categories;

  return (
    <div id="mobile-nav" className={styles.MobileMenu}>
      <Nav categories={categories} />
    </div>
  );
>>>>>>> dev-v2
}
