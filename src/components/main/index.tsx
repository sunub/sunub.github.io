import Asidemenu from "./aside_menu"
import PostcardList from "./postcard_list"

export default async function Main({ blogpost }: { blogpost: Description[] }) {

    return (<>
        <Asidemenu />
        <ul className="post_card_list">
            <span>최근 작성한 게시물</span>
            <PostcardList key={"postcard_list"} data={blogpost} />
        </ul>
    </>)
}
