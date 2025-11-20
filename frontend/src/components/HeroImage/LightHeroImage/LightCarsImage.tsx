import { AutoWidthImage, CarsTrack, CarsWindow } from '../HeroImage.style';

import LightCarImage from 'public/assets/cars.avif';

export function LightCarHeroImage() {
  const carsStyle = { '--cars-opacity': 'var(--color-light-heroimage)' } as React.CSSProperties;
  return (
    <CarsWindow style={carsStyle}>
        <CarsTrack>
          {[0, 1, 2, 3].map((index) => (
            <AutoWidthImage
              key={`cars-${index}`}
              src={LightCarImage}
              alt={index === 0 ? "light cars" : ""}
              priority={index < 2}
              aria-hidden={index !== 0}
              sizes="100vw"
            />
          ))}
        </CarsTrack>
      </CarsWindow>
  )
}