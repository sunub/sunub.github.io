"use client";

import { useTheme } from "@/components/Theme/ThemeProvider";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import * as Styled from "./ThemeToggler.style";

export default function ThemeTogglerButton({
	maskId,
	"data-testid": dataTestId = "theme-toggler-button",
	...delegated
}: {
	maskId: string;
	"data-testid"?: string;
}) {
	const { colorTheme, setColorTheme } = useTheme();

	function handleClick() {
		const nextTheme = colorTheme === "light" ? "dark" : "light";
		setColorTheme(nextTheme);
	}

	return (
		<Styled.ToggleBtn
			{...delegated}
			title="테마 변경"
			aria-label="theme-toggler-button"
			data-testid={dataTestId}
			onClick={() => handleClick()}
		>
			<VisuallyHidden>테마 변경 버튼</VisuallyHidden>
			<Styled.ToggleIconWrapper aria-hidden="true">
				<ThemeIcon maskId={maskId} />
			</Styled.ToggleIconWrapper>
		</Styled.ToggleBtn>
	);
}
function ThemeIcon({ maskId, ...delegated }: { maskId: string }) {
	return (
		<Styled.SunAndMoon
			{...delegated}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Styled.Sun
				cx="12"
				cy="12"
				r="5"
				fill="#2D0D06"
				mask={`url(#${maskId})`}
			/>
			<Styled.SunAndBeams>
				<path d="M12 3V3.52941" strokeWidth="3" strokeLinecap="round" />
				<path
					d="M5.63604 5.63604L6.01039 6.01039"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<path d="M3 12L3.52941 12" strokeWidth="3" strokeLinecap="round" />
				<path
					d="M5.63604 18.364L6.01039 17.9896"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<path d="M12 20.4706V21" strokeWidth="3" strokeLinecap="round" />
				<path
					d="M17.9896 17.9896L18.364 18.364"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<path d="M20.4706 12L21 12" strokeWidth="3" strokeLinecap="round" />
				<path
					d="M17.9896 6.01039L18.364 5.63604"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</Styled.SunAndBeams>
			<Styled.Moon
				id={maskId}
				maskUnits={"userSpaceOnUse"}
				maskContentUnits={"userSpaceOnUse"}
			>
				<rect x="0" y="0" width="100%" height="100%" fill="white" />
				<circle cx="24" cy="24" r="6" fill="black" />
			</Styled.Moon>
		</Styled.SunAndMoon>
	);
}
