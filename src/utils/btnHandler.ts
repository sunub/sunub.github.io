export default function ButtonHandler(e: Event) {
	const curr = e.currentTarget as HTMLElement;

	return {
		hidden: function (isOpen: boolean) {
			const property = "aria-hidden";

			curr.setAttribute(property, String(isOpen));
		},

		open: function (isOpen: boolean) {
			const property = "aria-label";
			let value = "Close menu";

			if (isOpen) {
				value = "Open menu";
			}
			curr.setAttribute(property, value);
		},
	};
}
