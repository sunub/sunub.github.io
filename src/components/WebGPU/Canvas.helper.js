import Matter, { Body, Constraint } from "matter-js";
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
		Composites = Matter.Composites,
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
	drawBridge();

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
		const BirdBox = Bodies.rectangle(clientWidth / 2, 0, 180, 165, {
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
		Composite.add(world, [BirdBox]);
	}

	function drawBridge() {
		const group = Body.nextCategory(true);

		const bridge = Composites.stack(160, 290, 15, 1, 0, 0, function (x, y) {
			return Bodies.rectangle(x - 20, y, 53, 20, {
				collisionFilter: { group: group },
				chamfer: 5,
				density: 0.005,
				frictionAir: 0.05,
				render: {
					fillStyle: "#060a19",
				},
			});
		});

		Composites.chain(bridge, 0.3, 0, -0.3, 0, {
			stiffness: 0.99,
			length: 0.0001,
			render: {
				visible: false,
			},
		});
		Composite.add(world, [
			bridge,
			Bodies.rectangle(-70, 490, 220, 380, {
				isStatic: true,
				chamfer: { radius: 20 },
			}),
			Bodies.rectangle(760, 490, 220, 380, {
				isStatic: true,
				chamfer: { radius: 20 },
			}),
			Constraint.create({
				pointA: { x: 40, y: 300 },
				bodyB: bridge.bodies[0],
				pointB: { x: 0, y: 0 },
				length: 2,
				stiffness: 0.9,
			}),
			Constraint.create({
				pointA: { x: 660, y: 300 },
				bodyB: bridge.bodies[bridge.bodies.length - 1],
				pointB: { x: 25, y: 0 },
				length: 2,
				stiffness: 0.9,
			}),
		]);
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
