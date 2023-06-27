import Loading from "./loading"
import PostCardList from "@/components/main/PostcardList"
import Asidemenu from "@/components/main/aside_menu"
import { getPost } from "@/utils/Post"
import PostCard from "@/components/postcardContext"

export default async function Page() {
  const post = await getPost()
  return (<div id="main">
    <PostCard>
      <Asidemenu />
      <ul className="postcard">
        <span>최근 작성한 게시물</span>
        <PostCardList data={post[1]} />
      </ul>
    </PostCard>
  </div>)
}