import React from "react";
import CardList from "./CardList/index";
import Post from "@/utils/post/Post";

async function LandingPage() {
	const post = new Post();
	const allList = post.frontMatters.get("all");

	return (
		<div style={{ gridArea: "main-content" }}>
			<CardList list={allList} />
		</div>
	);
}

export default LandingPage;
