import Post from "@/utils/Post";
import PostContent from "..";

function Wrapper({ category, slug }) {
	const post = new Post();
	const frontmatter = post.getSpecificFrontmatter(category, slug);
	const content = post.contents[slug];
	return <PostContent frontMatter={frontmatter} content={content} />;
}

export default Wrapper;
