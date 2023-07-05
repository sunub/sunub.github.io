export default function HamburgerBtn() {
    return (<button
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
        {/* <HamburgerBtn /> */}
    </button>)
}