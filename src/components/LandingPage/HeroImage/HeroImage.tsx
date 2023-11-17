"use client";

import styles from "./HeroImage.module.css";
import { BACKGROUNDS } from "./HeroImage.constant";
import Image from "next/image";
import styled from "styled-components";
import React from "react";
import CanvasClass from "./Canvas.helper";

const Canvas = styled.canvas`
	height: 50dvh;
`;

export default function HeroImage() {
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const imageRef = React.useRef<HTMLImageElement>(null);

	React.useEffect(() => {
		if (canvasRef.current && wrapperRef.current && imageRef.current) {
			const canvas = new CanvasClass(canvasRef.current, wrapperRef.current);
			canvas.draw(imageRef.current);
		}
	}, []);

	return (
		<div
			ref={wrapperRef}
			className={styles["hero-image__wrapper"]}>
			<Canvas ref={canvasRef} />
			<Image
				ref={imageRef}
				className={styles["hero-image__image"]}
				key={BACKGROUNDS[0].alt}
				src={`${BACKGROUNDS[0].src}?format=webp`}
				alt={BACKGROUNDS[0].alt}
				width={1284}
				height={725}
				priority={true}
				quality={10}
			/>
		</div>
	);
}

