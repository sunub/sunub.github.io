import Asidemenu from "./aside_menu"
import PostcardList from "./postcard_list"

export default async function Main() {

    return (<>
        <Asidemenu />
        <ul className="post_card_list">
            <span>최근 작성한 게시물</span>
            <PostcardList data={[]} />
        </ul>
    </>)
}
