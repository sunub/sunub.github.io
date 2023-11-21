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
    src: "/assets/hero_image--light_scene.webp?format=webp",
    alt: "hero image light scene",
    key: "hero image light scene",
    ref: "image",
  },
  {
    className: "hero-image__image-frame",
    src: "/assets/hero_image--light_frame.png?format=png",
    alt: "hero-image light frame",
    key: "hero-image light frame",
  },
  {
    className: "hero-image__image-clouds",
    src: "/assets/hero_image--light_clouds.png?format=png",
    alt: "background light clouds scene",
    key: "background light clouds scene",
    ref: "clouds",
  },
];

export const BACKGROUNDS_DARK: Background[] = [
  {
    className: "hero-image__image",
    src: "/assets/hero_image--dark_scene.webp?format=webp",
    alt: "hero image dark scene",
    key: "hero image dark scene",
    ref: "image",
  },
  {
    className: "hero-image__image-frame",
    src: "/assets/hero_image--dark_frame.png?format=png",
    alt: "hero-image dark frame",
    key: "hero-image dark frame",
  },
  {
    className: "hero-image__image-clouds",
    src: "/assets/hero_image--dark_clouds.png?format=png",
    alt: "background dark clouds scene",
    key: "background dark clouds scene",
    ref: "clouds",
  },
];
