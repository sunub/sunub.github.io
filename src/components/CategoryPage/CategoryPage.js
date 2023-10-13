import Card from "../LandingPage/Card";
import Post from "@/utils/Post";

function CategoryPage({ category }) {
	const post = new Post();
	const frontmatters = post.frontMatters[category];

	return (
		<div style={{ gridArea: "main-content" }}>
			{frontmatters.map((frontmatter) => (
				<Card key={crypto.randomUUID()} frontMatter={frontmatter} />
			))}
		</div>
	);
}

export default CategoryPage;
