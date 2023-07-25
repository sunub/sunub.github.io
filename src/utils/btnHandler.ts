export default function ButtonHandler(e: Event) {
	const curr = e.currentTarget as HTMLElement;

	return {
		hidden: function (isOpen: boolean) {
			const property = "aria-hidden";
			const value = isOpen === true ? "Open menu" : "Close menu";

			document.querySelectorAll("button").forEach((node) => {
				if (node.className.includes("HamburgerBtn")) {
					node.setAttribute("aria-label", value);
				}
			});

			curr.setAttribute(property, String(isOpen));
		},

		open: function (isOpen: boolean) {
			const property = "aria-label";
			let value = "Close menu";

			if (isOpen) {
				value = "Open menu";
			}

			document.querySelectorAll("button").forEach((node) => {
				if (node.className.includes("Navigation")) {
					node.setAttribute("aria-hidden", String(isOpen));
				}
			});

			curr.setAttribute(property, value);
		},
	};
}
