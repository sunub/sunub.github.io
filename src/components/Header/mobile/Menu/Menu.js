"use client";

import styles from "./Menu.module.css";
import Link from "next/link";

function Menu({ isOpen, setOpen, categories }) {
	const staggeredDelay = 100;
	return (
		<nav className={styles[`menu-content__container`]}>
			{categories.map((category, columnIndex) => {
				return (
					<Link
						href={`/${category}`}
						key={crypto.randomUUID()}
						onClick={() => setOpen(!isOpen)}
						className="mobile-menu__content"
						style={{
							animationDelay: columnIndex * staggeredDelay + "ms",
						}}
					>
						<span>{category}</span>
					</Link>
				);
			})}
		</nav>
	);
}

export default Menu;
