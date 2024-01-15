import styles from "./MobileNav.module.css";
import React from "react";
import Post from "@/utils/Post";
import Nav from "./Nav/Nav";

export default function MobileNav() {
<<<<<<< HEAD
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

=======
  const post = new Post();
  const categories = post.categories;

>>>>>>> refs/remotes/origin/sunub
  return (
    <div id="mobile-nav" className={styles.MobileMenu}>
      <Nav categories={categories} />
    </div>
  );
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
}
