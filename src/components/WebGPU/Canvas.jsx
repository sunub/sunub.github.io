"use client";

import React from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
	width: 100%;
	height: 80dvh;
`;

export default function BaseCanvas() {
	const canvasRef = React.useRef(null);

	const [isLoaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");

			context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

			setLoaded(!isLoaded);
		}
	}, []);

	React.useEffect(() => {
		function resize() {
			const clientWidth = window.innerWidth - 100;
			const clientHeight =
				window.innerHeight -
				document.getElementById("side-ng__header-content").clientHeight;
			const ctx = canvasRef.current.getContext("2d");

			canvasRef.current.width = clientWidth;
			canvasRef.current.height = clientHeight;
			ctx.scale(2, 2);
		}

		window.addEventListener("resize", resize, false);

		return () => window.removeEventListener("resize", resize, false);
	}, []);

	return (
		<>
			<Canvas ref={canvasRef} id="2d-physics" />
		</>
	);
}
