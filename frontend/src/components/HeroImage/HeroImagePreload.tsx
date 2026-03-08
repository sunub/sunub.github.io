import type { Theme } from "type";

interface Props {
  theme: Theme;
}

export function HeroImagePreload({ theme }: Props) {
  const isLight = theme === "light";

  const criticalImages = isLight
    ? ["/assets/light_clouds.webp", "/assets/light_bridge.webp", "/assets/light_cars.webp"]
    : ["/assets/dark_clouds.webp", "/assets/dark_bridge.webp", "/assets/dark_cars.webp"];
  return (
    <>
      {criticalImages.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          type="image/avif"
          fetchPriority="high"
          media="(min-width: 769px)"
        />
      ))}
    </>
  );
}
