"use client";

import { stagger, useAnimate } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { Article } from "./page.style";

export function ClientArticle({ children }: { children: React.ReactNode }) {
	const [scope, animate] = useAnimate();
	const pathname = usePathname();

	useLayoutEffect(() => {
		let isActive = true;

		const navigationEntry = performance.getEntriesByType("navigation").at(0) as
			| PerformanceNavigationTiming
			| undefined;
		const hasReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const hasRestoredScroll =
			window.scrollY > 0 || document.documentElement.scrollTop > 0;
		const isHistoryRestore = navigationEntry?.type === "back_forward";
		const visitKey = `post-article:animated:${pathname}`;
		const hasAnimatedBefore = sessionStorage.getItem(visitKey) === "true";

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

			const shouldAnimate =
				!hasReducedMotion &&
				!isHistoryRestore &&
				!hasRestoredScroll &&
				!hasAnimatedBefore;

			try {
				if (!isActive || !currentScope.isConnected) {
					return;
				}

				if (!shouldAnimate) {
					await animate(
						nodes,
						{
							opacity: 1,
							x: 0,
						},
						{
							duration: 0,
						},
					);
					sessionStorage.setItem(visitKey, "true");
					return;
				}

				await animate(
					nodes,
					{
						opacity: 0,
						x: -10,
					},
					{
						duration: 0,
					},
				);

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
				sessionStorage.setItem(visitKey, "true");
			} catch {
				// ignore when targets become invalid during route transitions
			}
		};

		void enterAnimation();

		return () => {
			isActive = false;
		};
	}, [animate, pathname, scope]);

	return (
		<Article ref={scope} id="blog-post__article-content">
			{children}
		</Article>
	);
}
