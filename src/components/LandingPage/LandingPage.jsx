import React from "react";
import CardList from "./CardList/index";
import Post from "@/utils/Post";

function LandingPage() {
	const post = new Post();
	const frontmatterList = post.frontMatters["all"];
	return (
		<div style={{ gridArea: "main-content" }}>
			<CardList list={frontmatterList} />
		</div>
	);
}

export default LandingPage;
