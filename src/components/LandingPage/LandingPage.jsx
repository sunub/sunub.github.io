import React from "react";
import CardList from "./CardList/index";
import useFrontMatters from "@/hooks/use-frontMatters.hook";

async function LandingPage() {
	const frontMatterList = await useFrontMatters("all");

	return (
		<div style={{ gridArea: "main-content" }}>
			<CardList list={frontMatterList} />
		</div>
	);
}

export default LandingPage;
