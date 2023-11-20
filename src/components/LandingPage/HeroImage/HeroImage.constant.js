import { BirdIcon, BridgeIcon, CloudsIcon } from "./HeroImageIcon";

export const BACKGROUNDS = [
  {
    className: "hero-image__image",
    src: "/assets/hero_image_scene2.webp?format=webp",
    alt: "hero-image back scene",
    key: "hero-image back scene",
    ref: "image",
  },
  {
    className: "hero-image__image-frame",
    src: "/assets/hero_image-frame.png?format=png",
    alt: "hero-image front frame",
    key: "hero-image front frame",
  },
  {
    className: "hero-image__image-clouds",
    src: "/assets/background_clouds.png?format=png",
    alt: "background sky clouds scene",
    key: "background sky clouds scene",
    ref: "clouds",
  },
];

export const BACKGROUND_SVG = [
  <BirdIcon key="bird" />,
  <BridgeIcon key="bridge" />,
  <CloudsIcon key="clouds" />,
];

// {
//   src: "/assets/ground_scene.webp",
//   alt: "ground scene hero image",
//   zIndex: 20,
// },
