import getPost from "@/lib/getPost"

export default async function PostCardList({ id }: { id: number }) {
    const descriptions: Description[] = await getPost()
    return (<>
        <ul className="post_card_list">
            <span>최근 작성한 게시물</span>
            {
                descriptions.map(description => {
                    return (<>
                        <li key={`${description.category}${Math.random() * 10}`} className="post_card">
                            <span>{description.title}</span>
                            <p>{description.date}</p>
                            <p>{description.description}</p>
                        </li>
                    </>)
                })
            }
        </ul>
    </>)
}