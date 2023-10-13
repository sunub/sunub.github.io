"use client";

import React from "react";
import { BirdLogo } from "../../../icon/Icons";
import Elevation from "@/constants/Elevation";
import Link from "next/link";

function Title() {
	return (
		<>
			<Elevation
				style={{
					border: "2px solid var(--color-text)",
					background: "transparent",
					padding: "2px",
				}}
				$width={45}
				$height={45}
				$border={8}
				$distance="short"
			>
				<Link href={"/"}>
					<BirdLogo stroke="" />
				</Link>
			</Elevation>
		</>
	);
}

export default Title;
