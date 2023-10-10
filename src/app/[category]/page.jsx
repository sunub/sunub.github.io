import Category from "@/components/Category/index";
import useFrontMatters from "@/hooks/use-frontMatters.hook";

export async function generateStaticParams() {
	const params = [];
	const visit = new Set();

	const posts = await useFrontMatters("all");
	for (const frontmatter of posts) {
		if (visit.has(frontmatter.category)) continue;
		params.push({
			category: frontmatter.category,
		});
		visit.add(frontmatter.category);
	}

	return params;
}
async function Page({ params }) {
	const { category } = params;
	const cateogries = await useFrontMatters(category);

	return <Category title={category} categories={cateogries} />;
}

export default Page;
