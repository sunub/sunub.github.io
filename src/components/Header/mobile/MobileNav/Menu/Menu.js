import Post from "@/utils/Post";
import styles from "./Menu.module.css";
import Link from "next/link";

async function Menu() {
	const post = new Post();
	const categories = post.categories;
	const staggeredDelay = 100;
	return (
		<nav className={styles[`menu-content__container`]}>
			{categories.map((category, columnIndex) => {
				return (
					<Link
						href={`/${category}`}
						key={category}
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
