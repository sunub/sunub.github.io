import ground from "public/assets/ground_scene.reduce.webp";
import sky from "public/assets/sky_scene.reduce.webp";
import front from "public/assets/front_scene.reduce.webp";

export const BACKGROUNDS = [
	{
		src: ground.src,
		alt: "ground scene hero image",
		width: ground.width,
		height: ground.height,
		zIndex: 20,
	},
	{
		src: sky.src,
		alt: "sky scene hero image",
		width: sky.width,
		height: sky.height,
		zIndex: 30,
	},
	{
		src: front.src,
		alt: "front scene hero image",
		width: front.width,
		height: front.height,
		zIndex: 40,
	},
];
