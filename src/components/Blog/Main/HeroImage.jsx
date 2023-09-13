import React from "react";
import Image from "next/image";
import { baseURL } from "@/utils/getBaseUrl";
import BaseCanvas from "@/components/WebGPU/Canvas";
import styled from "styled-components";

const url = `${baseURL}/bird.svg`;

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	padding: 2rem;
`;

export default function HeroImage() {
	return (
		<Container>
			<BaseCanvas />
		</Container>
	);
}

// 	/* <Image
// 	src={"/hero_image_scene.png"}
// 	width={1600}
// 	height={900}
// 	alt="Main Hero Image"
// /> */
