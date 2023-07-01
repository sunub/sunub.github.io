import Loading from "./loading"
import PostCardList from "@/components/main/PostcardList"
import Asidemenu from "@/components/main/aside_menu"
import { getPost } from "@/utils/Post"
import PostCard from "@/components/postcardContext"
import BirdIcon from "@/components/icon/BirdIcon"
import { Large, Small } from "@/components/icon/Cloud"
import MainBirdIcon from "@/components/main/MainBridIcon"

export default async function Page() {
  const post = await getPost()
  return (<>
    <MainBirdIcon />
    <div className="main__content">
      <PostCard>
        <Asidemenu />
        <ul className="postcard">
          <PostCardList data={post[1]} />
        </ul>
      </PostCard>
    </div>
  </>)
}