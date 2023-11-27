import Image from "next/image";
import React from "react";
import styles from "./LightHeroImage.module.css";

function LightHeroImage({
  imageRef,
  cloudsRef,
  theme,
}: {
  imageRef: React.RefObject<HTMLImageElement>;
  cloudsRef: React.RefObject<HTMLImageElement>;
  theme: any;
}): React.ReactNode {
  return (
    <picture className={styles["light-image--picture"]}>
      <Image
        className={styles["light-image--base-image"]}
        ref={imageRef}
        src={"/assets/hero_image--light-base-scene.avif?format=avif"}
        alt="base hero image"
        quality={75}
        width={883}
        height={449}
        sizes="100vw"
        style={{
          opacity: theme === "light" ? 1 : 0,
          objectFit: "cover",
        }}
        loading={"lazy"}
      />
      <Image
        className={styles["light-image--clouds"]}
        ref={cloudsRef}
        src={"/assets/hero_image--light-clouds.avif?format=avif"}
        alt="light cloud hero image"
        quality={75}
        width={883}
        height={449}
        sizes="100vw"
        style={{
          opacity: `${theme === "light" ? 1 : 0}`,
          objectFit: "cover",
        }}
        loading={"lazy"}
      />
    </picture>
  );
}

export default LightHeroImage;
