const storageKey = "theme-preference";

const getColorPreference = (): string => {
	if (localStorage.getItem(storageKey)) {
		return localStorage.getItem(storageKey)!;
	} else {
		return window.matchMedia("(prefers-color-scheme: light)").matches
			? "dark"
			: "light";
	}
};

const theme = { value: getColorPreference() };

const reflectPreference = () => {
	document.firstElementChild?.setAttribute("data-theme", theme.value);

	document
		.querySelector("#theme-toggle")
		?.setAttribute("data-theme", theme.value);
};

const setPreference = () => {
	localStorage.setItem(storageKey, theme.value);
	reflectPreference();
};

const onClick = () => {
	theme.value = theme.value === "light" ? "dark" : "light";
	setPreference();
};

export default (() => {
	reflectPreference();

	window.onload = () => {
		reflectPreference();

		const toggle = document.querySelector(
			"#theme-toggle"
		) as HTMLButtonElement;
		toggle.addEventListener("click", onClick);
	};

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", ({ matches: isDark }) => {
			theme.value = isDark ? "dark" : "light";
			setPreference();
		});
})();
