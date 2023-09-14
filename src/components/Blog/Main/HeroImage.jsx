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

const Button = styled.button`
	position: relative;
	left: calc(50% - 100px);
	padding: 1rem;
	background-color: black;
	color: white;

	width: 200px;
	border-radius: 30px;
	margin-bottom: 15px;
`;

export default function HeroImage() {
	const [trigger, setTrigger] = React.useState(0);

	return (
		<>
			<Container>
				<BaseCanvas key={trigger} />
			</Container>
			<Button onClick={() => setTrigger(trigger + 1)}>Rerender</Button>
		</>
	);
}

// 	/* <Image
// 	src={"/hero_image_scene.png"}
// 	width={1600}
// 	height={900}
// 	alt="Main Hero Image"
// /> */
