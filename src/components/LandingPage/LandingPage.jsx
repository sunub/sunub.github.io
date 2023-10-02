import React from "react";
import styles from "./LandingPage.module.css";
import CardList from "./CardList/index";
import Post from "@/utils/post/Post";
import LandScape from "./LandScape";

function LandingPage() {
	const post = new Post();
	const allList = post.frontMatters.get("all");

	return <CardList list={allList} />;
}

export default LandingPage;
