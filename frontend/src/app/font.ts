import localFont from "next/font/local";

export const pretendardRegular = localFont({
	src: "../../public/fonts/Pretendard-Regular.woff2",
	display: "swap",
	style: "normal",
	variable: "--pretendard-font-regular",
	fallback: ["system-ui", "sans-serif"],
});

export const craftyGirls = localFont({
	src: "../../public/fonts/CraftyGirls-Regular.woff2",
	display: "swap",
	style: "normal",
	variable: "--crafty-girls-font",
	fallback: ["system-ui", "sans-serif"],
});
