import Image from "next/image";
import React from "react";
import { BACKGROUNDS_DARK } from "./HeroImage.constant";

function DarkHeroImage({
  imageRef,
  cloudsRef,
  styles,
  opacity,
}: {
  imageRef: React.RefObject<HTMLImageElement>;
  cloudsRef: React.RefObject<HTMLImageElement>;
  styles: any;
  opacity: number;
}): React.ReactNode {
  const REF_KEYS: any = {
    image: imageRef,
    clouds: cloudsRef,
  };

  return (
    <>
      {BACKGROUNDS_DARK.map((background) => {
        return (
          <Image
            ref={background.ref ? REF_KEYS[`${background.ref}`] : null}
            className={styles[`${background.className}`]}
            key={background.key}
            src={background.src}
            alt={background.alt}
            width={883}
            height={325}
            priority={true}
            quality={75}
            sizes="100vw"
            style={{
              opacity: opacity,
              objectFit: "cover",
            }}
          />
        );
      })}
    </>
  );
}

export default DarkHeroImage;
