"use client";

import { useControls } from "leva";

export default function Experience() {
	const controls = useControls({
		position: {
			value: { x: 0, y: 0, z: 300 },
			step: 10,
		},
	});
}
