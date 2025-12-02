import localFont from "next/font/local";

export const pretendardRegular = localFont({
	src: "../../public/fonts/Pretendard-Regular.subset.woff2",
	display: "swap",
	style: "normal",
	variable: "--pretendard-font-regular",
	fallback: ["system-ui", "sans-serif"],
});

export const craftyGirls = localFont({
	src: "../../public/fonts/CraftyGirls-Regular.woff2",
	display: "swap",
	weight: "400",
	style: "normal",
	variable: "--crafty-girls-font",
	fallback: ["system-ui", "sans-serif"],
});
