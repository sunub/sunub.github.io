"use client";

import { stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { Article } from "./page.style";

export function ClientArticle({ children }: { children: React.ReactNode }) {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		const enterAnimation = async () => {
			await animate(
				"& > *",
				{
					opacity: [0, 1],
					x: [-10, 0],
				},
				{
					duration: 0.8,
					delay: stagger(0.05, { startDelay: 0.1 }),
					ease: "easeOut",
				},
			);
		};

		void enterAnimation();
	}, [animate]);

	return (
		<Article ref={scope} id="blog-post__article-content">
			{children}
		</Article>
	);
}
