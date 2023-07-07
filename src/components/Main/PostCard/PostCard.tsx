import PostCardList from "./CardList/PostcardList"
import { getPost } from "@/utils/Post"
import AsideMenu from "./AsideMenu/index"
import PostCardCtx from "./PostCardContext"
import MainBirdIcon from "@/components/icon/MainBridIcon"
import styles from "./PostCard.module.css"

export default async function PostCard() {
    const post = await getPost()

    return (
        <>
            <div className={styles.main__content}>
                <PostCardCtx>
                    <AsideMenu categories={post[0]} />
                    <ul className="postcard">
                        <PostCardList data={post[1]} />
                    </ul>
                </PostCardCtx>
            </div>
        </>)
}