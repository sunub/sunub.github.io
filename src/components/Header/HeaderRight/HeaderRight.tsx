import SearchBtn from "./SearchBtn";
import ThemeToggler from "../../Theme/ThemeToggler";

export default function HeaderRight() {
    return (
        <div className="site-header__right-component">
            <ThemeToggler />
            {/* <SearchBtn /> */}
        </div>
    );
}