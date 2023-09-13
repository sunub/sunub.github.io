"use client";

import React from "react";
import styled from "styled-components";
import Matter from "matter-js";
import birdPng from "public/bird.png";
import foot from "public/foot.png";

const Container = styled.div`
	width: 100%;
	height: 80dvh;
`;

function setPhysics() {
	const container = document.getElementById("2d-physics");
	const SVG_WIDTH_IN_PX = 180;
	const SVG_WIDTH_AS_PERCENT_OF_CONTAINER_WIDTH = 0.3;

	const Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Composite = Matter.Composite,
		Bodies = Matter.Bodies,
		Body = Matter.Body,
		Svg = Matter.Svg,
		Vector = Matter.Vector,
		Common = Matter.Common,
		Vertices = Matter.Vertices;

	const engine = Engine.create(),
		world = engine.world;
	const render = Render.create({
		element: container,
		engine: engine,
		options: {
			width: container.clientWidth,
			height: container.clientHeight,
			background: "transparent",
			wireframes: false,
		},
	});
	// const select = function (root, selector) {
	// 	return Array.prototype.slice.call(root.querySelectorAll(selector));
	// };

	// const load = function () {
	// 	return fetch(bird.src)
	// 		.then((response) => response.text())
	// 		.then((raw) => {
	// 			const result = new window.DOMParser().parseFromString(
	// 				raw,
	// 				"image/svg+xml"
	// 			);
	// 			return result;
	// 		});
	// };

	// function loadSvgPaths() {
	// 	load().then((root) => {
	// 		const vertexSets = select(root, "path").map((path) =>
	// 			Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4)
	// 		);

	// 		Composite.add(world, Bodies.fromVertices(400, 80, vertexSets));
	// 	});
	// }

	const BirdFoot = Bodies.rectangle(
		container.clientWidth / 2,
		container.clientHeight / 2 + 30,
		100,
		15,
		{
			render: {
				sprite: {
					texture: foot.src,
				},
			},
		}
	);
	const BirdBody = Bodies.rectangle(
		container.clientWidth / 2 - 9,
		container.clientHeight / 2 + 10,
		155,
		94,
		{
			render: BirdFoot.render,
		}
	);
	const BirdHead = Bodies.rectangle(
		container.clientWidth / 2 + 23,
		container.clientHeight / 2 - 80,
		141,
		86
	);

	const ground = Bodies.rectangle(400, 500, 2000, 30, { isStatic: true });
	// const Bird = Body.create({
	// 	parts: [BirdHead, BirdFoot, BirdBody],
	// });
	// Bird.render.sprite.texture = birdPng.src;

	const Box = Bodies.rectangle(
		container.clientWidth / 2,
		container.clientHeight / 2 - 300,
		190,
		190,
		{
			render: {
				sprite: {
					texture: birdPng.src,
				},
			},
		}
	);

	Composite.add(engine.world, [BirdFoot, Box, ground]);

	Render.run(render);
	const runner = Runner.create();
	Runner.run(runner, engine);
}

export default function BaseCanvas() {
	const [isLoaded, setLoaded] = React.useState(false);

	const loadPhysics = React.useCallback(setPhysics, []);

	React.useEffect(() => {
		if (isLoaded) {
			loadPhysics();
		}

		if (!isLoaded) {
			setLoaded(!isLoaded);
		}
	}, [isLoaded]);

	return (
		<>
			<Container id="2d-physics"></Container>
		</>
	);
}
