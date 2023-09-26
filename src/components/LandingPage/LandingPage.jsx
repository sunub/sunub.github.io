import React from "react";
import styles from "./LandingPage.module.css";
import CardList from "./CardList/index";
import HeroImage from "./HeroImage";
import Post from "@/utils/post/Post";

function LandingPage() {
	const post = new Post();
	const allList = post.frontMatters.get("all");

	return (
		<div className={styles.landingPage}>
			<HeroImage />
			<CardList list={allList} />
		</div>
	);
}

export default LandingPage;
