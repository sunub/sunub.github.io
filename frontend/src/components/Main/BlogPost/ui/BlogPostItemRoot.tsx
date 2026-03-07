"use client";

import type { HTMLMotionProps, Variants } from "motion/react";
import { BlogPostListItem } from "../style";

export type BlogPostItemAnimationMode = "initial" | "soft" | "animate";

interface BlogPostItemProps extends Omit<HTMLMotionProps<"li">, "itemRef"> {
	itemRef?: (el: HTMLLIElement | null) => void;
	children: React.ReactNode;
	animationMode: BlogPostItemAnimationMode;
}

const itemVariants: Variants = {
	hidden: {
		y: -8,
		opacity: 0,
	},
	softHidden: {
		y: -2,
		opacity: 0.78,
	},
	visible: (mode: BlogPostItemAnimationMode) => ({
		y: 0,
		opacity: 1,
		transition: {
			duration: mode === "soft" ? 0.24 : 0.38,
			ease: "easeOut",
		},
	}),
};

export function BlogPostItemRoot({
	itemRef,
	children,
	animationMode,
	...props
}: BlogPostItemProps) {
	return (
		<BlogPostListItem
			ref={itemRef}
			variants={itemVariants}
			custom={animationMode}
			initial={
				animationMode === "initial"
					? "hidden"
					: animationMode === "soft"
						? "softHidden"
						: false
			}
			animate="visible"
			className="blog-post__recently-post-item"
			{...props}
		>
			<article>{children}</article>
		</BlogPostListItem>
	);
}
