"use client";

import { chunkArray } from "@/utils/utils";
import React from "react";

function LandingPage({ post }) {
	const id = React.useId();
	const chunkedPost = chunkArray([...post], 3);

	return (
		<div>
			<h1>HI!</h1>
		</div>
	);
}

export default LandingPage;
