import { AnimationTrack, AnimationWindow, AutoWidthImage } from '../HeroImage.style';

import DarkHeroCloudImage from 'public/assets/dark_clouds.avif';

export function DarkCloudHeroImage() {
  const cloudStyle = { '--clouds-opacity': 'var(--color-dark-heroimage)' } as React.CSSProperties;

  return (
    <AnimationWindow style={cloudStyle}>
      <AnimationTrack>
        <AutoWidthImage src={DarkHeroCloudImage} alt="dark clouds" priority sizes="100vw" />
        <AutoWidthImage src={DarkHeroCloudImage} alt="dark clouds loop 1" priority sizes="100vw" />
        <AutoWidthImage src={DarkHeroCloudImage} alt="dark clouds loop 2" priority sizes="100vw" />
      </AnimationTrack>
    </AnimationWindow>
  );
}
