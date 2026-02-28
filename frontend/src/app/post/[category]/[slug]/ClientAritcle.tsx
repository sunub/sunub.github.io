"use client";

import { stagger, useAnimate } from "motion/react";
import { useEffect } from "react";
import { Article } from "./page.style";

export function ClientArticle({ children }: { children: React.ReactNode }) {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		let isActive = true;

		const enterAnimation = async () => {
			const currentScope = scope.current;
			if (!currentScope || !currentScope.isConnected) {
				return;
			}

			const nodes = Array.from(currentScope.children).filter(
				(node): node is Element => node instanceof Element && node.isConnected,
			);
			if (!isActive || nodes.length === 0) {
				return;
			}

			try {
				if (!isActive || !currentScope.isConnected) {
					return;
				}

				await animate(
					nodes,
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
			} catch {
				// ignore when targets become invalid during route transitions
			}
		};

		void enterAnimation();

		return () => {
			isActive = false;
		};
	}, [animate, scope]);

	return (
		<Article ref={scope} id="blog-post__article-content">
			{children}
		</Article>
	);
}
