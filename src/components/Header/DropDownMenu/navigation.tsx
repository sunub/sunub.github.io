'use client';

export default function NavigationDrawer() {
    return (
        <>
            <web-navigation-drawer type="standard">
                <nav
                    aria-label="main navigator"
                    className="site-header__nav"
                    data-drawer-container={''}
                    aria-expanded={false}
                >
                    {/* {
                        navInfo.map((info) => {
                            return (
                                <div
                                    key={info.title}
                                    className="tabs-wrapper"
                                    onMouseLeave={(event) => {
                                        const curTarget = event.currentTarget

                                        document.querySelectorAll(".tab").forEach(tab => {
                                            if (curTarget.contains(tab)) {
                                                tab.setAttribute("aria-expanded", "false")
                                            }
                                        })
                                        document.querySelectorAll(".tab-dropdown-column").forEach(dropdownMenu => {
                                            if (curTarget.contains(dropdownMenu)) {
                                                dropdownMenu.removeAttribute("dropdown--open")
                                            }
                                        })
                                        document.querySelectorAll(".tabs-dropdown-toggle").forEach(dropdownToggle => {
                                            if (curTarget.contains(dropdownToggle)) {
                                                dropdownToggle.setAttribute("aria-expanded", "false")
                                            }
                                        })
                                    }}
                                >
                                    <DropdownMenu
                                        url={info.url}
                                        title={info.title}
                                        dataLabel={info.dataLabel}
                                        class={"site-header__link"}
                                        category="Site-Wide Custom Events"
                                        content={[...Object.keys(storageData)]}
                                    />
                                </div>
                            )
                        })
                    } */}
                </nav>
            </web-navigation-drawer>
        </>
    );
}
