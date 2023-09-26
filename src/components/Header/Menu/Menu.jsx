"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "@/components/Header/icon/Icons";
import { baseURL } from "@/utils/getBaseUrl";
import Elevation from "@/constants/Elevation";

function Icon({ usage }) {
	switch (usage) {
		case "web":
			return <Icons.Web />;
		case "code":
			return <Icons.Code />;
		case "cs":
			return <Icons.CS />;
		case "algorithm":
			return <Icons.Algo />;
		default:
			return <Icons.BirdLogo />;
	}
}

function Menu({ usage }) {
	return (
		<Elevation
			style={{
				cursor: "pointer",
				outlineOffset: "4px",
			}}
			$size={64}
			$distance="none"
			$usage="others"
		>
			<Link href={`${baseURL}/${usage}`}>
				<Icon usage={usage} />
			</Link>
		</Elevation>
	);
}

export default Menu;
