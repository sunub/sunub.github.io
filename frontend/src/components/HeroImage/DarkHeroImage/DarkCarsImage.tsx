import DarkCarImage from "public/assets/dark_cars.avif";
import { AutoWidthImage, CarsTrack, CarsWindow } from "../HeroImage.style";

export function DarkCarHeroImage() {
	const carsStyle = {
		"--cars-opacity": "var(--color-dark-heroimage)",
	} as React.CSSProperties;
	return (
		<CarsWindow style={carsStyle}>
			<CarsTrack>
				{/* 이미지 3개 연속 배치 (무한 스크롤 효과) */}
				{[0, 1, 2, 3].map((index) => (
					<AutoWidthImage
						key={`cars-${index}`}
						src={DarkCarImage}
						alt={index === 0 ? "dark cars" : ""}
						priority={index < 2}
						aria-hidden={index !== 0}
						sizes="100vw"
					/>
				))}
			</CarsTrack>
		</CarsWindow>
	);
}
