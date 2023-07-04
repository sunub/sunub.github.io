import PostCardList from "./CardList/PostcardList"
import { getPost } from "@/utils/Post"
import Asidemenu from "./AsideMenu/aside_menu"
import PostCardCtx from "./PostCardContext"
import MainBirdIcon from "@/components/icon/MainBridIcon"

export default async function PostCard() {
    const post = await getPost()

    return (
        <>
            <MainBirdIcon />
            <div className="main__content">
                <PostCardCtx>
                    <Asidemenu />
                    <ul className="postcard">
                        <PostCardList data={post[1]} />
                    </ul>
                </PostCardCtx>
            </div>
        </>)
}