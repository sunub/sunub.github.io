import Main from "@/components/main/index"
import Loading from "./loading"
import PostCardList from "@/components/main/postcard_list"
import Asidemenu from "@/components/main/aside_menu"
import { getPost } from "@/utils/Post"
import PostCard from "@/components/postcardContext"

export default async function Page() {
  const post: Map<string, Description[]> = await getPost()
  return (<>
    <div id="main">
      <PostCard>
        <Asidemenu />
        <ul className="post_card_list">
          <span>최근 작성한 게시물</span>
          <PostCardList data={post} />
        </ul>
      </PostCard>
    </div>
  </>)
}