import Link from "next/link"

export default function Logo() {
    return (<>
        <Link href={"/"} className="site-header__brand brand">
            @sun_ub
        </Link>
    </>)
}