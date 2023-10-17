import Images from "./Images";
import styles from "./HeroImage.module.css";

export default function HeroImage() {
	return (
		<div className={styles["hero-image__root-wrapper"]}>
			<Images />
		</div>
	);
}
