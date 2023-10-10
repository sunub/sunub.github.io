import { baseURL } from "@/utils/getBaseUrl";
import Link from "next/link";
import styles from "./Menu.module.css";

async function getPostCategories() {
	const res = await fetch(`${baseURL}/api`);
	const json = await res.json();
	const data = json.data;
	const posts = data.post;

	return Object.keys(posts);
}
async function Menu() {
	const categories = await getPostCategories();
	const staggeredDelay = 100;

	return (
		<nav className={styles[`menu-content`]} aria-hidden="true">
			{categories.map((category, columnIndex) => {
				return (
					<Link
						href={`/${category}`}
						key={category}
						className={styles["menu-content__content"]}
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
