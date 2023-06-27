import { getPost, findPostByCategoryAndSlug } from "@/utils/Post"

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

    return (posts.map(post => {
        return (
            <div className="post">
                <article className="post__article">
                    <header>
                        <div className="post__article__header">
                            <h1>{post.title}</h1>
                            <dl className="post__article__header--date">
                                <dd>{post.date}</dd>
                            </dl>
                        </div>
                    </header>
                    <main
                        className="post__article__main"
                        dangerouslySetInnerHTML={{ __html: `${post.content}` }}
                    />
                    <footer>

                    </footer>
                </article>
            </div>
        )
    }))
}