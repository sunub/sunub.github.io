import Image from "next/image"

export default async function PostCardList({ data }: { data: Description[] }) {

    return (<>
        {
            data.map(description => {
                return (<>
                    <li key={`${description["title"]}`}>
                        <article className="post_card">
                            <Image
                                src={`/icon_${description.tags}.png`}
                                width={24}
                                height={24}
                                alt={`Image ${description.category}`}
                            />
                            <header>
                                <h1>{description.title}</h1>
                                <time>{description.date}</time>
                            </header>
                            <section>
                                <p>{description.description}</p>
                            </section>
                        </article>
                    </li>
                </>)
            })
        }
    </>)
}