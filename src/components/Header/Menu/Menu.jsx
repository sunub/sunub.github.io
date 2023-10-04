"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "@/components/Header/icon/Icons";
import { baseURL } from "@/utils/getBaseUrl";
import Elevation from "@/constants/Elevation";
import styled from "styled-components";

const Wrapper = styled(Link)``;

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
		<Link href={`${baseURL}/${usage}`}>
			<Elevation
				style={{
					cursor: "pointer",
					outlineOffset: "4px",
					padding: "4px",
				}}
				$width={64}
				$height={64}
				$border={16}
				$distance="none"
				$usage="others"
			>
				<Icon usage={usage} />
			</Elevation>
		</Link>
	);
}

export default Menu;
