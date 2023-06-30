import BookNavBar from "./mobile/booknavbar"
import HeaderLeft from "./HeaderLeft"
import HeaderRight from "./HeaderRight"

export default function Header() {
    return (
        <div className="site-header">
            <HeaderLeft />
            <HeaderRight />
        </div>
    )
}
