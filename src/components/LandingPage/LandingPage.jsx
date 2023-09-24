import React from "react";
import styles from "./LandingPage.module.css";
import CardList from "./CardList/index";
import { chunkArray } from "@/utils/utils";
import Post from "@/utils/post/Post";

function LandingPage() {
	const post = new Post();
	const allList = post.frontMatters.get("all");
	const chunkedList = chunkArray([...allList], 3);

	return (
		<div className={styles.landingPage}>
			<CardList list={chunkedList} />
		</div>
	);
}

export default LandingPage;
