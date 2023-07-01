import BookNavBar from "./mobile/booknavbar"
import HeaderLeft from "./HeaderLeft"
import HeaderRight from "./HeaderRight"

export default function Header() {
    return (
        <header className="site-header">
            <HeaderLeft />
            <HeaderRight />
        </header>
    )
}
