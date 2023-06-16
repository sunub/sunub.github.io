import getPost from "@/lib/getPost"
import Image from "next/image"

export default async function PostCardList({ id }: { id: number }) {
    const descriptions: Description[] = await getPost()
    return (<>
        <ul className="post_card_list">
            <span>최근 작성한 게시물</span>
            {
                descriptions.map(description => {
                    return (<>
                        <li key={`${description.category}${Math.random() * 10}`}>
                            <article className="post_card">
                                <Image
                                    src={`/icon_${description.category}.png`}
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
        </ul>
    </>)
}