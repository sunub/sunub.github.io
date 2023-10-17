import Image from "next/image";
import { BACKGROUNDS } from "./Images.constants.mjs";
import styles from "./Image.module.css";

function Images() {
	return (
		<div className={styles["hero-image__wrapper"]}>
			{BACKGROUNDS.map((background) => (
				<Image
					className={styles["hero-image__image"]}
					key={background.src}
					src={`${background.src}?format=webp`}
					alt={background.alt}
					width={background.width}
					height={background.height}
					priority={true}
					quality={10}
					style={{
						zIndex: `${background.zIndex}`,
					}}
				/>
			))}
		</div>
	);
}

export default Images;
