import Post from "@/utils/Post";
import styles from "./CategoryPage.module.css";
import CardList from "../LandingPage/CardList";
import HeroImage from "./HeroImage";
import Footer from "../Footer";

async function getFrontmatters(category) {
  const post = new Post();
  const frontmatters = post.frontMatters[category];
  return frontmatters;
}

async function CategoryPage({ category }) {
  const frontmatters = await getFrontmatters(category);

  return (
    <main className={styles.Wrapper}>
      <HeroImage category={category} />
      <CardList id={"cateogry-page__card-list"} list={frontmatters} />
    </main>
  );
}

export default CategoryPage;
