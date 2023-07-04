import { getPost, findPostByCategoryAndSlug } from "@/utils/Post"
import PostCardContent from "@/components/main/PostCard/Content/index";

export async function generateStaticParams() {
    const allPost = await getPost();
    const params: any[] = [];
    allPost[0].map((post) => {
        params.push([post.category, post.slug]);
    });
    return params.map((param) => ({
        category: param[0],
        slug: param[1]
    }))
}

export default async function Page({ params }: { params: { category: string, slug: string } }) {
    const blogpost = await getPost()
    const { category, slug } = params
    const posts = findPostByCategoryAndSlug(category, slug, blogpost[1])

    return (<>
        <PostCardContent posts={posts} />
    </>)
}