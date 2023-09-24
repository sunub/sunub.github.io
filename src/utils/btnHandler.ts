export default function ButtonHandler(e: Event) {
	const curr = e.currentTarget as HTMLElement;
	const navMenu = document.querySelector("nav");

	return {
		hidden: function (isOpen: boolean) {
			const property = "aria-hidden";
			const value = isOpen === true ? "Open menu" : "Close menu";

			document
				.querySelector("button.hamburger-btn")
				?.setAttribute("aria-label", value);
			curr.setAttribute(property, String(isOpen));
			navMenu && navMenu.setAttribute("aria-hidden", String(isOpen));
			if (navMenu) {
				navMenu.style.visibility = "hidden";
				navMenu.style.opacity = "0";
			}
		},

		open: function (isOpen: boolean) {
			const property = "aria-label";
			let value = "Close menu";

			if (isOpen) {
				value = "Open menu";
			}

			const navBtn = document.querySelector("button.navigation-menu");

			navBtn?.setAttribute("aria-hidden", String(isOpen));
			navMenu && navMenu.setAttribute("aria-hidden", String(isOpen));
			curr.setAttribute(property, value);
			if (navMenu && !isOpen) {
				navMenu.style.visibility = "visible";
				navMenu.style.opacity = "1";
			} else if (navMenu && isOpen) {
				navMenu.style.visibility = "hidden";
				navMenu.style.opacity = "0";
			}
		},

		animation: function (node: HTMLElement) {
			const visibility = node.style.visibility === "hidden";

			console.log(visibility);
		},
	};
}
