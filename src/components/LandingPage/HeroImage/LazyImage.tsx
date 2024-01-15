import Image from "next/image";
import styles from "./HeroImage.module.css";

function LazyImage() {
  return (
    <Image
      className={styles["hero-image__lazy-image"]}
      key={"hero image lazy image"}
      src={"/assets/hero_image_light_full_scene.webp?format=webp"}
      alt={"hero image lazy image"}
      width={883}
      height={325}
      priority={true}
      quality={100}
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
    />
  );
}

export default LazyImage;
