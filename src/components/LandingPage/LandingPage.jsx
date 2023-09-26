import React from "react";
import styles from "./LandingPage.module.css";
import CardList from "./CardList/index";
import { chunkArray } from "@/utils/utils";
import Post from "@/utils/post/Post";

function LandingPage() {
	const post = new Post();
	const allList = post.frontMatters.get("all");

	return (
		<div className={styles.landingPage}>
			<CardList list={allList} />
		</div>
	);
}

export default LandingPage;
