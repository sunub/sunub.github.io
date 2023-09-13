"use client";

import React from "react";
import styled from "styled-components";
import Matter from "matter-js";
import birdPng from "public/bird.png";
import foot from "public/foot.png";
import body from "public/body.png";
import head from "public/head.png";

const Container = styled.canvas`
	width: 100%;
	height: 80dvh;
`;

function setPhysics() {
	const root = document.getElementById("2d-physics");
	let clientWidth = root.clientWidth,
		clientHeight = root.clientHeight;

	const Engine = Matter.Engine,
		Render = Matter.Render,
		Bodies = Matter.Bodies,
		Composites = Matter.Composites,
		Composite = Matter.Composite,
		Body = Matter.Body,
		Runner = Matter.Runner;

	const engine = Engine.create(),
		world = engine.world;

	const render = Render.create({
		canvas: root,
		engine: engine,
		options: {
			width: clientWidth,
			height: clientHeight * 0.7,
			showAngleIndicator: false,
			background: "transparent",
			wireframes: false,
		},
	});

	Render.run(render);

	const Box = Bodies.rectangle(clientWidth / 2, 200, 40, 30);

	const ground = Bodies.rectangle(
		clientWidth / 2,
		clientHeight - 190,
		clientWidth,
		20,
		{
			isStatic: true,
		}
	);
	const BirdFoot = Bodies.rectangle(
		clientWidth / 2,
		clientHeight / 2 + 60,
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
		clientWidth / 2 - 9,
		clientHeight / 2 + 10,
		155,
		94,
		{
			render: {
				sprite: {
					texture: body.src,
				},
			},
		}
	);
	const BirdHead = Bodies.rectangle(
		clientWidth / 2 + 22,
		clientHeight / 2 - 80,
		139,
		88,
		{
			render: {
				sprite: {
					texture: head.src,
				},
			},
		}
	);

	const Bird = Body.create({
		parts: [BirdFoot, BirdBody, BirdHead],
	});
	Composite.add(world, [Bird, ground]);

	const runner = Runner.create();
	Runner.run(runner, engine);
}

export default function BaseCanvas() {
	const [isLoaded, setLoaded] = React.useState(false);

	const loadPhysics = React.useCallback(setPhysics, []);

	React.useEffect(() => {
		loadPhysics();
		if (!isLoaded) {
			setLoaded(!isLoaded);
		}
	}, [isLoaded]);

	return <Container id="2d-physics"></Container>;
}

// const container = document.getElementById("2d-physics");

// const Engine = Matter.Engine,
// 	Render = Matter.Render,
// 	Runner = Matter.Runner,
// 	Composites = Matter.Composites,
// 	Composite = Matter.Composite,
// 	Bodies = Matter.Bodies,
// 	Body = Matter.Body,
// 	Svg = Matter.Svg,
// 	Vector = Matter.Vector,
// 	Common = Matter.Common,
// 	Vertices = Matter.Vertices;

// const engine = Engine.create(),
// 	world = engine.world;
// const render = Render.create({
// 	element: container,
// 	engine: engine,
// 	options: {
// 		width: container.clientWidth,
// 		height: container.clientHeight,
// 		background: "transparent",
// 		wireframes: false,
// 	},
// });

// const bridge = Composites.stack(160, 290, 15, 1, 0, 0, function (x, y) {
// 	return Bodies;
// });

// const BirdFoot = Bodies.rectangle(
// 	container.clientWidth / 2,
// 	container.clientHeight / 2 + 60,
// 	100,
// 	15,
// 	{
// 		render: {
// 			sprite: {
// 				texture: foot.src,
// 			},
// 		},
// 	}
// );
// const BirdBody = Bodies.rectangle(
// 	container.clientWidth / 2 - 9,
// 	container.clientHeight / 2 + 10,
// 	155,
// 	94,
// 	{
// 		render: {
// 			sprite: {
// 				texture: body.src,
// 			},
// 		},
// 	}
// );
// const BirdHead = Bodies.rectangle(
// 	container.clientWidth / 2 + 22,
// 	container.clientHeight / 2 - 80,
// 	139,
// 	88,
// 	{
// 		render: {
// 			sprite: {
// 				texture: head.src,
// 			},
// 		},
// 	}
// );

// const ground = Bodies.rectangle(400, 500, 2000, 30, { isStatic: true });
// const Bird = Body.create({
// 	parts: [BirdFoot, BirdBody, BirdHead],
// });

// const Box = Bodies.rectangle(
// 	container.clientWidth / 2,
// 	container.clientHeight / 2 - 300,
// 	190,
// 	190,
// 	{
// 		render: {
// 			sprite: {
// 				texture: birdPng.src,
// 			},
// 		},
// 	}
// );

// Composite.add(engine.world, [ground]);

// Render.run(render);
// const runner = Runner.create();
// Runner.run(runner, engine);
