import CategoryPage from "@/components/CategoryPage";
import Post from "@/utils/Post";

export async function generateStaticParams() {
    const post = new Post();
    const frontmatters = post.frontMatters["all"]
    const categories = Object.keys(frontmatters);

    return categories.map(category => ({
        params: {
            category
        }
    }))
}

async function Page({ params }: { params: { category: string } }) {
    const { category } = params;
    return <CategoryPage category={category} />
}

export default Page