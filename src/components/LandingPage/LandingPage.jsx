import React from "react";
import CardList from "./CardList/index";
import Post from "@/utils/Post";

function LandingPage() {
	const post = new Post();
	const frontmatterList = post.frontMatters["all"];
	return <CardList list={frontmatterList} />;
}

export default LandingPage;
