import lowerSky from "public/assets/lower_cloud.webp";
import higherSky from "public/assets/higher_cloud.webp";
import Image from "next/image";
import styles from "./HeroImage.module.css";

function HeroImage({ category }) {
	return (
		<div className={styles.Wrapper}>
			<h1 className={styles.Title}>{category}</h1>
			<Image
				className={styles.LowerCloud}
				src={`${lowerSky.src}?format=webp`}
				alt={"Cateogry Page HeroImage"}
				width={lowerSky.width}
				height={lowerSky.height}
				priority={true}
				quality={10}
			/>
			<Image
				className={styles.HigherCloud}
				src={`${higherSky.src}?format=webp`}
				alt={"Cateogry Page HeroImage"}
				width={higherSky.width}
				height={higherSky.height}
				priority={true}
				quality={10}
			/>
		</div>
	);
}

export default HeroImage;
