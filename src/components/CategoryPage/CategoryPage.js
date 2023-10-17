import Card from "../LandingPage/Card";
import Post from "@/utils/Post";

async function getFrontmatters(category) {
	const post = new Post();
	const frontmatters = post.frontMatters[category];
	return frontmatters;
}

async function CategoryPage({ category }) {
	const frontmatters = await getFrontmatters(category);

	if (!frontmatters) {
		return null;
	}

	return (
		<div style={{ gridArea: "main-content" }}>
			{frontmatters.map((frontmatter) => (
				<Card key={crypto.randomUUID()} frontMatter={frontmatter} />
			))}
		</div>
	);
}

export default CategoryPage;
