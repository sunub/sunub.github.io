"use client";

import React from "react";
import styled from "styled-components";
import Matter from "matter-js";
import frame from "public/bird.svg";
import birdPng from "public/bird.png";
import birdHead from "public/head.png";
import birdBody from "public/body.png";
import birdFoot from "public/foot.png";

const Container = styled.canvas`
	width: 100%;
	height: 80dvh;
`;

function setPhysics() {
	const root = document.getElementById("2d-physics");
	const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
	const SVG_WITH_AS_PERCENT = 90 * 0.3;
	const SVG_WIDTH = 90;
	let clientWidth = root.clientWidth * pixelRatio,
		clientHeight = root.clientHeight * pixelRatio;

	const Engine = Matter.Engine,
		Render = Matter.Render,
		Bodies = Matter.Bodies,
		Composites = Matter.Composites,
		Composite = Matter.Composite,
		Body = Matter.Body,
		Runner = Matter.Runner,
		Svg = Matter.Svg,
		Vertices = Matter.Vertices,
		Common = Matter.Common,
		Mouse = Matter.Mouse,
		MouseConstraint = Matter.MouseConstraint;

	Common.setDecomp(require("poly-decomp"));

	const engine = Engine.create(),
		world = engine.world;

	const render = Render.create({
		canvas: root,
		engine: engine,
		options: {
			width: clientWidth,
			height: clientHeight,
			background: "transparent",
			wireframes: false,
		},
	});

	Render.run(render);

	const runner = Runner.create();
	Runner.run(runner, engine);

	const BirdBox = Bodies.rectangle(clientWidth / 2, 0, 88, 96, {
		render: {
			sprite: {
				texture: birdPng.src,
			},
		},
	});

	const ground = Bodies.rectangle(
		clientWidth / 2,
		clientHeight + 10,
		clientWidth,
		20,
		{
			isStatic: true,
		}
	);
	Composite.add(world, [BirdBox, ground]);

	const mouse = Mouse.create(render.canvas),
		mouseContraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false,
				},
			},
		});

	Composite.add(world, mouseContraint);
	render.mouse = mouse;
}

export default function BaseCanvas() {
	const canvasRef = React.useRef(null);
	const [isLoaded, setLoaded] = React.useState(false);

	const loadPhysics = React.useCallback(setPhysics, []);

	React.useEffect(() => {
		loadPhysics();
	}, [loadPhysics]);

	React.useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");

			context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

			setLoaded(!isLoaded);
		}
	}, []);

	return <Container ref={canvasRef} id="2d-physics"></Container>;
}

// const select = (root, selctor) => {
// 	return Array.prototype.slice.call(root.querySelectorAll(selctor));
// };

// const loadSvg = (url) => {
// 	return fetch(url)
// 		.then((res) => res.text())
// 		.then((raw) =>
// 			new window.DOMParser().parseFromString(raw, "image/svg+xml")
// 		);
// };

// const svg = await loadSvg(frame.src);
// const path = select(svg, "path").pop();

// const vertices = Svg.pathToVertices(path);
// const svgBody = Bodies.fromVertices(
// 	clientWidth / 2,
// 	0,
// 	[vertices],
// 	{
// 		render: {
// 			sprite: {
// 				texture: birdPng.src,
// 			},
// 		},
// 	},
// 	true
// );
