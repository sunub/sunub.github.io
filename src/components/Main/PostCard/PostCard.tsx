import PostCardList from "./CardList/PostcardList";
import { getPost } from "@/utils/Post";
import AsideMenu from "./AsideMenu/index";
import PostCardCtx from "./PostCardContext";

export default async function PostCard() {
    const post = await getPost();

    return (<>
        <PostCardCtx>
            <AsideMenu categories={post[0]} />
            <PostCardList data={post[1]} />
        </PostCardCtx>
    </>);
}