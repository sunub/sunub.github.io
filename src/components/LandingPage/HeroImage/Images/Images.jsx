"use client";

import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { BACKGROUNDS } from "./Images.constants";

const Wrapper = styled.div`
	display: grid;
	grid-area: [hero-image] 1fr / [hero-image] 1fr;

	justify-content: center;
	align-items: center;

	background: linear-gradient(
		oklch(82.9% 0.09573202406959574 31.111262465234525),
		oklch(97.14% 0.011 31.07)
	);
`;

const BackgroundImage = styled(Image)`
	position: relative;
	grid-area: hero-image;

	width: 100%;
`;

function Images() {
	return (
		<Wrapper>
			{BACKGROUNDS.map((background) => (
				<BackgroundImage
					key={background.src}
					src={background.src}
					alt={background.alt}
					width={700}
					height={500}
					style={{ zIndex: `${background.zIndex}` }}
				/>
			))}
		</Wrapper>
	);
}

export default Images;
