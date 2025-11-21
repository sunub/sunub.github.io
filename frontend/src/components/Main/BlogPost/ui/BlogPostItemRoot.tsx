"use client";

import type { HTMLMotionProps, Variants } from "motion/react";
import { BlogPostListItem } from "../style";

interface BlogPostItemProps extends HTMLMotionProps<"li"> {
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
	children,
	index,
	...props
}: BlogPostItemProps) {
	return (
		<BlogPostListItem
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
