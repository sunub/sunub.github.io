export function HeroImagePreload() {
  const criticalImages = [
    { src: '/assets/bridge.avif', media: '(prefers-color-scheme: light)' },
    { src: '/assets/dark_bridge.avif', media: '(prefers-color-scheme: dark)' },
    { src: '/assets/clouds.avif', media: '(prefers-color-scheme: light)' },
    { src: '/assets/dark_clouds.avif', media: '(prefers-color-scheme: dark)' },
  ];

  return (
    <>
      {criticalImages.map(({ src, media }) => (
        <link key={src} rel="preload" as="image" href={src} type="image/avif" media={media} fetchPriority="high" />
      ))}
    </>
  );
}
