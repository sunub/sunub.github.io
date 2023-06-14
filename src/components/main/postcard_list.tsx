import { get } from "http"
import { baseURL } from "@/lib/getBaseUrl"

export default async function PostCardList({ id }: { id: number }) {
    return (<>
        <ul className="post_card_list">
            <li className="post_card">
                <article>
                    <h1>Content</h1>
                </article>
            </li>
        </ul>
    </>)
}