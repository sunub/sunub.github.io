interface Background {
  className: string;
  src: string;
  alt: string;
  key: string;
  ref?: string;
}

export const BACKGROUNDS_LIGHT: Background[] = [
  {
    className: "hero-image__image",
    src: "/assets/hero_image_light-base-image.webp?format=webp",
    alt: "hero image light scene",
    key: "hero image light scene",
    ref: "image",
  },
  {
    className: "hero-image__image-clouds",
    src: "/assets/hero_image--light_clouds.webp?format=webp",
    alt: "background light clouds scene",
    key: "background light clouds scene",
    ref: "clouds",
  },
];

export const BACKGROUNDS_DARK: Background[] = [
  {
    className: "hero-image__image",
    src: "/assets/hero_image--dark-base-scene.webp?format=webp",
    alt: "hero image dark scene",
    key: "hero image dark scene",
    ref: "image",
  },
  {
    className: "hero-image__image-clouds",
    src: "/assets/hero_image--dark_clouds.webp?format=webp",
    alt: "background dark clouds scene",
    key: "background dark clouds scene",
    ref: "clouds",
  },
];
