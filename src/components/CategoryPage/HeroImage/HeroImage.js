import styles from "./HeroImage.module.css";

function HeroImage({ category }) {
  return (
    <div className={styles.Wrapper}>
      <h1 className={styles.Title}>{category}</h1>
    </div>
  );
}

export default HeroImage;
