import Post from "@/utils/post/Post";
import Link from "next/link";
import styles from "./MenuContent.module.css";

export default function MenuContent() {
    const post = new Post();
    return (
        <div className={styles[`menu-content__container`]}>
            <ul>
                {
                    post.categories.map(category => {
                        return (
                            <li key={category}>
                                <Link href={`/${category}`} >
                                    {category}
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}