import Post from "@/utils/Post";
import styles from "./CategoryPage.module.css";
import CardList from "../LandingPage/CardList";
import HeroImage from "./HeroImage";

async function getFrontmatters(category) {
	const post = new Post();
	const frontmatters = post.frontMatters[category];
	return frontmatters;
}

async function CategoryPage({ category }) {
	const frontmatters = await getFrontmatters(category);

	return (
		<div className={styles.Wrapper}>
			<HeroImage category={category} />
			<CardList list={frontmatters} />
		</div>
	);
}

export default CategoryPage;
