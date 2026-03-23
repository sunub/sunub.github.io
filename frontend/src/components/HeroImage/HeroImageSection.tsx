"use client";

import { useState } from "react";
import { Wave } from "@/components/Header/Wave";
import { HeroImageIdleWarmup } from "./HeroImageIdleWarmup";
import {
	HeroImageDesktopOnly,
	HeroImageSectionWrapper,
} from "./HeroImageSection.style";
import { HeroPoster } from "./HeroPoster";

export function HeroImageSection() {
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);

	return (
		<HeroImageSectionWrapper>
			<HeroImageDesktopOnly>
				<HeroPoster hidden={isOverlayVisible} />
				<HeroImageIdleWarmup onOverlayVisibleChange={setIsOverlayVisible} />
				<Wave />
			</HeroImageDesktopOnly>
		</HeroImageSectionWrapper>
	);
}
