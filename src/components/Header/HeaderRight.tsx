import SearchBtn from "./web/SearchBtn"
import ThemeToggler from "./web/ThemeToggler"

export default function HeaderRight() {
    return (
        <div className="site-header__right-component">
            <ThemeToggler />
            {/* <SearchBtn /> */}
        </div>
    )
}