const ge = "modal";

export default (() => {
	customElements.define(
		"web-navigation-drawer",
		class extends HTMLElement {
			static get properties() {
				return {
					type: {
						type: "string",
						reflect: !0,
					},
					open: {
						type: "boolean",
						reflect: !0,
					},
					animating: {
						type: "boolean",
						reflect: !0,
					},
				};
			}

			set open(isOpen) {
				if (this._open === isOpen) {
					return;
				}
				this._open = isOpen;
				this.animating = !0;
				this._open && document.addEventListener("keyup", this.onKeyUp);
			}

			constructor() {
				super();
				this.type = null;
				this._open = !1;
				this.animating = !1;
				this.onKeyUp = this.onKeyUp.bind(this);
			}

			connectedCallback() {
				this.tabIndex = -1;
				this.type === ge && (this.inert = !0);
				this.drawerContainer = this.querySelector(
					"[data-drawer-container]"
				);
				this.addEventListeners();
			}

			disconnectedCallback() {
				console.log("removed the page");
			}

			addEventListeners() {
				this.drawerContainer.addEventListener(
					"click",
					this.onBlockClicks
				);
			}

			onBlockClicks(e) {
				e.stopPropagation();
			}

			static get observedAttributes() {
				return ["open"];
			}

			attributeChangedCallback() {
				document.addEventListener("keyup", this.onKeyUp);
			}

			onKeyUp(event) {
				if (event.key === "Escape") {
					this.removeOpen();
				}
			}

			removeOpen() {
				const el = document.querySelector("web-navigation-drawer");
				if (el?.hasAttribute("open")) {
					el.removeAttribute("open");
					document.removeEventListener("keyup", this.onKeyUp);
				}
			}
		}
	);
	customElements.define(
		"web-book-nav",
		class extends HTMLElement {
			static get properties() {
				return {
					open: {
						type: Boolean,
						reflect: !0,
					},
				};
			}

			constructor() {
				super();
				this._open = !1;
				this.animating = !0;
				this?.setAttribute("fixed", "");
			}

			static get observedAttributes() {
				return ["open"];
			}

			get open() {
				return this._open;
			}

			set open(val) {
				if (this._open === val) return;
				this._open = val;
				this.animating = !0;
				this._open &&
					document.addEventListener("keyup", this.escapeKeyEvent);
			}

			connectedCallback() {
				this.tabIndex = -1;
				this.closeBtn = this.querySelector(
					"[data-drawer-close-button]"
				);
				this.addEventListeners();
			}

			addEventListeners() {
				this.closeBtn?.addEventListener("click", this.closeBtnEvent);
				this.addEventListener("click", this.trackingClickEvent);
			}

			attributeChangedCallback(name, oldValue, newValue) {
				this.open = newValue;
				this.focus();
			}

			trackingClickEvent(event) {
				const curTarget = event.target;
				const navContent = document.querySelector(
					".web-book-nav__content"
				);
				if (!navContent?.contains(curTarget)) {
					this.closeBtnEvent();
				}
			}

			closeBtnEvent() {
				const booknav = document.querySelector("web-book-nav");
				const navContent = document.querySelector(
					".web-book-nav__content"
				);
				const navDrawer = document.querySelector(
					"web-navigation-drawer"
				);
				const isOpen = booknav?.hasAttribute("open");
				if (isOpen) {
					booknav?.removeAttribute("open");
					navContent?.setAttribute("aria-expanded", "false");
					navDrawer?.setAttribute("hidden", "");
				}
			}

			escapeKeyEvent(event) {
				if (event.key === "Escape") {
					const navContent = document.querySelector(
						".web-book-nav__content"
					);
					const booknav = document.querySelector("web-book-nav");
					const navDrawer = document.querySelector(
						"web-navigation-drawer"
					);
					booknav?.removeAttribute("open");
					document.removeEventListener("keyup", this.escapeKeyEvent);
					navContent?.setAttribute("aria-expanded", "false");
					navDrawer?.removeAttribute("hidden");
				}
			}
		}
	);
})();
