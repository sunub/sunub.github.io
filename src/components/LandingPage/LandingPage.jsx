import React from "react";
import CardList from "./CardList/index";
import Post from "@/utils/Post";
import styles from "./LandingPage.module.css";

function LandingPage() {
	const post = new Post();
	const frontmatterList = post.frontMatters["all"];
	return (
		<div className={styles.landingPage}>
			<CardList list={frontmatterList} />
		</div>
	);
}

export default LandingPage;
