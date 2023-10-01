import Category from "@/components/Category/index";
import Post from "@/utils/post/Post";

const posts = new Post();
export async function generateStaticParams() {
	const params = [];

	posts.frontMatters.get("all")?.map((frontmatter) => {
		params.push({
			category: frontmatter.category,
		});
	});

	return params.map((param) => ({
		category: param.cateogry,
	}));
}
async function Page({ params }) {
	const { category } = params;
	const cateogries = posts.frontMatters.get(category);

	return <Category title={category} categories={cateogries} />;
}

export default Page;