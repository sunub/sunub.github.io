import React from "react";
import CardList from "./CardList/index";
import { getBaseUrl } from "@/utils/getBaseUrl.mjs";
import useFrontMatters from "@/hooks/use-frontMatters.hook";

async function LandingPage() {
	const baseURL = await getBaseUrl();
	const allList = await useFrontMatters("all");

	return (
		<div style={{ gridArea: "main-content" }}>
			<CardList baseURL={baseURL} list={allList} />
		</div>
	);
}

export default LandingPage;
