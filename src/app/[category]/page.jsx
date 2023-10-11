import Category from "@/components/Category/index";
import useCateogry from "@/hooks/use-category";
import useFrontMatters from "@/hooks/use-frontMatters.hook";

export async function generateStaticParams() {
	const params = await useCateogry();
	return params;
}
async function Page({ params }) {
	const { category } = params;
	const frontMatters = await useFrontMatters(category);

	return <Category title={category} categories={frontMatters} />;
}

export default Page;
