"use client";

import { chunkArray } from "@/utils/utils";
import React from "react";
import CardList from "./CardList/index";

function LandingPage({ post }) {
	const id = React.useId();
	const chunkedList = chunkArray([...post], 3);

	return (
		<div>
			<CardList list={chunkedList} />
		</div>
	);
}

export default LandingPage;
