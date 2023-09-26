import Matter from "matter-js";
import birdPng from "public/bird.png";

// export function drawBackground(canvas) {
// 	const ctx = canvas.getContext("2d");

// 	const image = new Image();
// 	image.onload = () => {
// 		const width = canvas.clientWidth;
// 		const aspect = Math.floor(image.height / image.width);
// 		const dpr = window.devicePixelRatio || 1;

// 		canvas.height = width * aspect;

// 		const curr = {
// 			width: Math.floor(image.width * 0.5) * dpr,
// 			height: Math.floor(image.height * 0.5) * dpr,
// 		};

// 		canvas.width = curr.width;
// 		canvas.height = curr.height;

// 		ctx.drawImage(image, 0, 0, 1600, 903, 0, 0, curr.width, curr.height);
// 		ctx.imageSmoothingEnabled = false;
// 		ctx.scale(dpr, dpr);
// 	};
// 	image.src = bg.src;
// }

export function setPhysics() {
	const root = document.getElementById("2d-physics");
	const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
	let clientWidth = root.clientWidth * pixelRatio,
		clientHeight = root.clientHeight * pixelRatio;

	const Engine = Matter.Engine,
		Render = Matter.Render,
		Bodies = Matter.Bodies,
		Composite = Matter.Composite,
		Runner = Matter.Runner,
		Common = Matter.Common,
		Mouse = Matter.Mouse,
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

	drawBirdOnCanvas();

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

	function drawBirdOnCanvas() {
		const BirdBox = Bodies.rectangle(clientWidth / 2, 0, 180, 192, {
			render: {
				sprite: {
					texture: birdPng.src,
				},
			},
		});

		const ground = Bodies.rectangle(
			clientWidth / 2,
			clientHeight + 10,
			clientWidth * 2,
			20,
			{
				isStatic: true,
			}
		);
		Composite.add(world, [BirdBox, ground]);
	}

	// function scaleBodies() {
	// 	const allBodies = Composite.allBodies(engine.world);

	// 	allBodies.forEach((body) => {
	// 		if (body.isStatic) return;
	// 		const { min, max } = body.bounds;
	// 		const bodyWidth = max.x - min.x;
	// 		let scaleFactor = (clientWidth * SVG_WITH_AS_PERCENT) / bodyWidth;

	// 		Body.scale(body, scaleFactor, scaleFactor);
	// 	});
	// }
}
