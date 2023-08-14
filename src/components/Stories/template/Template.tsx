export default function Template() {
    const contentLength = [2, 3, 2]

    return (
        <div className="stories">
            {
                contentLength.map((contentCount) => {
                    const content = Array.from({ length: contentCount }, () => 0)
                    return (
                        <section className="user" key={Math.random() * Number.MAX_SAFE_INTEGER}>
                            {
                                content.map((v) => {
                                    return (
                                        <article key={Math.random() * Number.MAX_SAFE_INTEGER}>
                                            {v}
                                        </article>
                                    )
                                })
                            }
                        </section>
                    )
                })
            }
        </div>
    )
}