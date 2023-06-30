import Loading from "./loading"
import PostCardList from "@/components/main/PostcardList"
import Asidemenu from "@/components/main/aside_menu"
import { getPost } from "@/utils/Post"
import PostCard from "@/components/postcardContext"
import Provider from "@/components/Provider"

export default async function Page() {
  const post = await getPost()
  return (<div id="main">
    <PostCard>
      <Asidemenu />
      <ul className="postcard">
        <PostCardList data={post[1]} />
      </ul>
    </PostCard>
  </div>)
}