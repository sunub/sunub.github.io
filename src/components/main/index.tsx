import Asidemenu from "./aside_menu"
import PostcardList from "./postcard_list"
import { baseURL } from "../../lib/getBaseUrl"

export default function Main() {
    return (<>
        <Asidemenu />
        {/* @ts-expect-error */}
        <PostcardList id={1} />
    </>)
}
