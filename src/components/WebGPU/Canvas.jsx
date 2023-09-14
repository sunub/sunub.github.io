"use client";

import React from "react";
import styled from "styled-components";
import Matter, { Common } from "matter-js";
import birdPng from "public/bird.png";
import foot from "public/foot.png";
import body from "public/body.png";
import head from "public/head.png";
import * as decomp from "poly-decomp";
import frame from "public/birdFrame.svg";

const Container = styled.canvas`
	width: 100%;
	height: 80dvh;
`;

function setPhysics() {
	const root = document.getElementById("2d-physics");
	const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
	let clientWidth = root.clientWidth * pixelRatio,
		clientHeight = root.clientHeight * pixelRatio;

	const Engine = Matter.Engine,
		Render = Matter.Render,
		Bodies = Matter.Bodies,
		Composites = Matter.Composites,
		Composite = Matter.Composite,
		Body = Matter.Body,
		Runner = Matter.Runner,
		Mouse = Matter.Mouse,
		Svg = Matter.Svg,
		Vertices = Matter.Vertices,
		Common = Matter.Common,
		MouseConstraint = Matter.MouseConstraint;

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	Common.setDecomp(require("poly-decomp"));

	const engine = Engine.create(),
		world = engine.world;

	const render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: 800,
			height: 600,
		},
	});

	Render.run(render);

	const runner = Runner.create();
	Runner.run(runner, engine);

	const select = (root, selector) => {
		return Array.prototype.slice.call(root.querySelectorAll(selector));
	};

	const loadSvg = (url) => {
		return fetch(url)
			.then((res) => res.text())
			.then((raw) =>
				new window.DOMParser().parseFromString(raw, "image/svg+xml")
			);
	};

	loadSvg(frame.src).then((root) => {
		const vertexSets = select(root, "path").map((path) =>
			Svg.pathToVertices(path, 30)
		);

		Composite.add(
			world,
			Bodies.fromVertices(
				clientWidth / 2,
				0,
				vertexSets,
				{
					render: {
						fillStyle: "black",
						strokeStyle: "black",
						lineWidth: 1,
					},
				},
				true
			)
		);
	});

	const ground = Bodies.rectangle(
		clientWidth / 2,
		clientHeight - 190,
		clientWidth,
		20,
		{
			isStatic: true,
		}
	);
	Composite.add(world, [ground]);
}

export default function BaseCanvas() {
	const canvasRef = React.useRef(null);
	const [isLoaded, setLoaded] = React.useState(false);

	const loadPhysics = React.useCallback(setPhysics, []);

	React.useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");

			context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

			loadPhysics();
		}
	}, []);

	React.useEffect(() => {
		if (isLoaded) {
			loadPhysics();
		}

		if (!isLoaded) {
			setLoaded(!isLoaded);
		}
	}, [isLoaded]);

	return <Container ref={canvasRef} id="2d-physics"></Container>;
}

// const engine = Engine.create(),
// world = engine.world;

// const render = Render.create({
// canvas: root,
// engine: engine,
// options: {
// 	width: clientWidth,
// 	height: clientHeight * 0.7,
// 	showAngleIndicator: false,
// 	background: "transparent",
// 	wireframes: false,
// },
// });

// Render.run(render);

// const ground = Bodies.rectangle(
// clientWidth / 2,
// clientHeight - 190,
// clientWidth,
// 20,
// {
// 	isStatic: true,
// }
// );

// // const BirdFoot = Bodies.rectangle(
// // 	clientWidth / 2,
// // 	clientHeight / 2 + 60,
// // 	80,
// // 	15,
// // 	{
// // 		render: {
// // 			sprite: {
// // 				texture: foot.src,
// // 			},
// // 		},
// // 	}
// // );
// const BirdBody = Bodies.rectangle(
// clientWidth / 2 - 9,
// clientHeight / 2 + 10,
// 155,
// 30,
// {
// 	render: {
// 		sprite: {
// 			texture: body.src,
// 		},
// 	},
// }
// );
// const BirdHead = Bodies.rectangle(
// clientWidth / 2 + 22,
// clientHeight / 2 - 80,
// 139,
// 88,
// {
// 	render: {
// 		sprite: {
// 			texture: head.src,
// 		},
// 	},
// }
// );

// // const Bird = Body.create({
// // 	parts: [BirdFoot, BirdBody],
// // 	mass: 3,
// // 	density: 1,
// // });

// const Box = Bodies.rectangle(clientWidth / 2, 0, 100, 15, {
// render: {
// 	sprite: {
// 		texture: foot.src,
// 	},
// },
// });

// const Box2 = Bodies.rectangle(clientWidth / 2, 0, 155, 94, {
// render: {
// 	sprite: {
// 		texture: body.src,
// 	},
// },
// });

// const aBody = Body.create({
// parts: [Box, Box2],
// });

// const select = (root, selctor) => {
// return Array.prototype.slice.call(root.querySelectorAll(selctor));
// };

// const loadSvg = (url) => {
// return fetch(url)
// 	.then((res) => res.text())
// 	.then((raw) =>
// 		new window.DOMParser().parseFromString(raw, "image/svg+xml")
// 	);
// };

// loadSvg(frame.src).then((root) => {
// const paths = select(root, "path");

// paths.forEach((path, index) => {
// 	const vertices = Svg.pathToVertices(path);

// 	let svgBody = Bodies.fromVertices(clientWidth / 2, 0, [vertices]);
// 	Composite.add(engine.world, svgBody);
// });
// });

// const aExam = Bodies.trapezoid(clientWidth / 2, 0, 30, 150, 3);

// Composite.add(world, [aExam, ground]);

// const mouse = Mouse.create(render.canvas),
// mouseConstraint = MouseConstraint.create(engine, {
// 	mouse: mouse,
// 	constraint: {
// 		stiffness: 0.2,
// 		render: {
// 			visible: false,
// 		},
// 	},
// });

// Composite.add(world, mouseConstraint);
// const runner = Runner.create();
// Runner.run(runner, engine);
