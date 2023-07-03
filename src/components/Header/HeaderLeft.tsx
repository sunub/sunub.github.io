import Link from "next/link"

export default function HeaderLeft() {
    return (<>
        <div className="cluster gutter-base">
            {/* <button
                className="icon-button tooltip md:hidden-yes"
                aria-label="menu-open-hamburgerBtn"
                onClick={() => {
                    const navDrawer = document.querySelector("web-navigation-drawer")
                    navDrawer?.removeAttribute("hidden")

                    const bookNav = document.querySelector("web-book-nav")
                    bookNav?.setAttribute("open", "true")

                    const navContent = document.querySelector(".web-book-nav__content")
                    navContent?.setAttribute("aria-expanded", "true")
                }}
            >
                <HamburgerBtn />
            </button> */}
            <Link href={"/"} className="site-header__brand brand">
                @sun_ub
            </Link>
        </div>
        {/* <div className="icon_container">
            <div id="brid-main-icon">
                <Large />
                <BirdIcon />
                <Small />
            </div>
        </div> */}
    </>)
}