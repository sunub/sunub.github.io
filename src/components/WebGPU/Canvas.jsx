"use client";

import React from "react";
import styled from "styled-components";
import Matter from "matter-js";
import frame from "public/birdFrame.svg";

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

	const select = (root, selctor) => {
		return Array.prototype.slice.call(root.querySelectorAll(selctor));
	};

	const loadSvg = (url) => {
		return fetch(url)
			.then((res) => res.text())
			.then((raw) =>
				new window.DOMParser().parseFromString(raw, "image/svg+xml")
			);
	};

	loadSvg(frame.src).then((root) => {
		const paths = select(root, "path");

		paths.forEach((path, index) => {
			const vertices = Svg.pathToVertices(path);

			let svgBody = Bodies.fromVertices(clientWidth / 2, 0, [vertices]);
			Composite.add(engine.world, svgBody);
		});
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
	Composite.add(world, [ground]);
}

export default function BaseCanvas() {
	const canvasRef = React.useRef(null);
	const [isLoaded, setLoaded] = React.useState(false);

	const loadPhysics = React.useCallback(setPhysics, [isLoaded]);

	React.useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");

			context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

			loadPhysics();
			setLoaded(!isLoaded);
		}
	}, []);

	React.useEffect(() => {
		if (!isLoaded) {
			setLoaded(!isLoaded);
		}
	}, [isLoaded]);

	return <Container ref={canvasRef} id="2d-physics"></Container>;
}
