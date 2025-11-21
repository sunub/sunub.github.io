import { motion, type Variants } from "motion/react";
import { memo } from "react";
import { BlogPostList } from "../../style";
import { BlogPostItem } from "../BlogPostItem";
import { useBlogPostContext } from "../BlogPostProvider";

const MotionBlogPostList = motion.create(BlogPostList);

const containerVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};

export const BlogPostListViewRoot = memo(function BlogPostListViewRoot({
	children,
}: {
	children?: React.ReactNode;
}) {
	const { posts } = useBlogPostContext();

	return (
		<MotionBlogPostList
			id="blog-post__recently-post-list"
			data-testid="blog-main__recently-post-list"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{posts.map((post, index) => (
				<BlogPostItem
					key={`${post.category}-${post.slug}-${index}`}
					post={post}
					index={index}
				/>
			))}
			{children}
		</MotionBlogPostList>
	);
});
