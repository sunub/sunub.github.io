import styles from "./HeroImage.module.css";
import { BACKGROUNDS } from "./HeroImage.constant";
import Image from "next/image";


export default function HeroImage() {
	return (
		<div className={styles["hero-image__wrapper"]}>
			{BACKGROUNDS.map((background) => (
				<Image
					className={styles["hero-image__image"]}
					key={background.alt}
					src={`${background.src}?format=webp`}
					alt={background.alt}
					width={1284}
					height={725}
					priority={true}
					quality={10}
					sizes="100vw"
					style={{
						width: '100dvw',
						height: 'auto',
						zIndex: `${background.zIndex}`,
					}}
				/>
			))}
		</div>
	);
}
