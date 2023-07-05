export default async function PostCardContent({ posts }: { posts: Description[] }) {
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