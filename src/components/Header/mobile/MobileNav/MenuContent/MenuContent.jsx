import Link from "next/link";
import styles from "./MenuContent.module.css";
import React from "react";
import { baseURL } from "@/utils/getBaseUrl";

async function getPostCategories() {
	const res = await fetch(`${baseURL}/api`);
	const json = await res.json();
	const data = json.data;
	const posts = data.post;

	return Object.keys(posts);
}

export default async function MenuContent() {
	const staggeredDelay = 100;
	const categories = await getPostCategories();

	return (
		<nav className={styles[`menu-content`]} aria-hidden="true">
			<div className={styles[`menu-content__container`]}>
				{categories.map((category, columnIndex) => {
					return (
						<Link
							href={`/${category}`}
							key={category}
							className={styles["menu-content__content"]}
							style={{
								animationDelay:
									columnIndex * staggeredDelay + "ms",
							}}
						>
							<span>{category}</span>
						</Link>
					);
				})}
			</div>
			<div
				className={styles[`menu-content__footer`]}
				style={{
					animationDelay: "500ms",
				}}
			></div>
		</nav>
	);
}
