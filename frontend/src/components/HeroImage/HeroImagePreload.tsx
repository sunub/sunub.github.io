import { Theme } from 'type';

interface Props {
  theme: Theme;
}

export function HeroImagePreload({ theme }: Props) {
  const isLight = theme === 'light';
  
  const criticalImages = isLight
    ? [
        '/assets/bridge.avif',
        '/assets/clouds.avif',
        '/assets/cars.avif'
      ]
    : [
        '/assets/dark_bridge.avif',
        '/assets/dark_clouds.avif',
        '/assets/dark_cars.avif'
      ];

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
        />
      ))}
    </>
  );
}