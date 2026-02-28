"use client";

import type { HTMLMotionProps, Variants } from "motion/react";
import { BlogPostListItem } from "../style";

interface BlogPostItemProps extends Omit<HTMLMotionProps<"li">, "itemRef"> {
	itemRef?: (el: HTMLLIElement | null) => void;
	children: React.ReactNode;
	index: number;
}

const itemVariants: Variants = {
	hidden: {
		y: -10,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

export function BlogPostItemRoot({
	itemRef,
	children,
	index,
	...props
}: BlogPostItemProps) {
	return (
		<BlogPostListItem
			ref={itemRef}
			variants={itemVariants}
			initial="hidden"
			animate="visible"
			$isInitialize={index < 10}
			className="blog-post__recently-post-item"
			{...props}
		>
			<article>{children}</article>
		</BlogPostListItem>
	);
}
