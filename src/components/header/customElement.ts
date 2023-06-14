const ge = "modal";

export default (() => {
  customElements.define(
    "web-navigation-drawer",
    class extends HTMLElement {
      type: any;
      _open: boolean;
      animating: boolean;
      onTransitionEnd: any;
      drawerContainer: any;
      closeBtn: any;

      static get properties() {
        return {
          type: {
            type: String,
            reflect: !0,
          },
          open: {
            type: Boolean,
            reflect: !0,
          },
          animating: {
            type: Boolean,
            reflect: !0,
          },
        };
      }

      set open(isOpen: boolean) {
        if (this._open === isOpen) {
          return;
        }
        const e = this._open;
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
        this.drawerContainer = this.querySelector("[data-drawer-container]");
        this.addEventListeners();
      }

      disconnectedCallback() {
        console.log("removed the page");
      }

      addEventListeners() {
        this.drawerContainer.addEventListener("click", this.onBlockClicks);
      }

      onBlockClicks(e: any) {
        e.stopPropagation();
      }

      static get observedAttributes() {
        return ["open"];
      }

      attributeChangedCallback() {
        document.addEventListener("keyup", this.onKeyUp);
      }

      onKeyUp(event: KeyboardEvent) {
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
    "web-header",
    class extends HTMLElement {
      openDrawerBtn: any;

      constructor() {
        super();
      }

      connectedCallback() {
        this.className = "site-header";
        this.role = "banner";
        this.openDrawerBtn = this.querySelector("[data-open-drawer-button]")!;
        this.openDrawerBtn && this.openDrawerBtn.addEventListener("click");
      }

      disconnectedCallback() {
        this.openDrawerBtn && this.openDrawerBtn.removeEventListener("click");
      }

      onStateChanged(isSearchExpanded: boolean, currentUrl: string) {
        this.classList.toggle(
          "web-header--has-expanded-search",
          isSearchExpanded
        );
        currentUrl = currentUrl
          .replace(/"/g, '\\"')
          .match(/^\/\w+\//)
          ?.at(0)!;
        const activeQuery = this.querySelector("[active]"),
          urlQuery = this.querySelector(`[href="${currentUrl}"]`);
        if (activeQuery && activeQuery !== urlQuery) {
          activeQuery?.removeAttribute("aria-current");
        }
        if (urlQuery) {
          urlQuery.setAttribute("active", "");
          urlQuery.setAttribute("aria-current", "page");
        }
      }

      manageFocus() {
        this.openDrawerBtn && this.openDrawerBtn.focus();
      }

      closeBtnEvent(event: MouseEvent) {
        const currTarget = event.currentTarget;
        if (currTarget === this.openDrawerBtn) {
          const drawer = this.querySelector("web-navigation-drawer");
          drawer?.setAttribute("open", "");
        }
      }
    }
  );

  customElements.define(
    "web-book-nav",
    class extends HTMLElement {
      closeBtn: any;
      booknav: any;
      _open: boolean;
      animating: boolean;

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
        this._open && document.addEventListener("keyup", this.escapeKeyEvent);
      }

      connectedCallback() {
        this.tabIndex = -1;
        this.closeBtn = this.querySelector("[data-drawer-close-button]");
        this.addEventListeners();
      }

      addEventListeners() {
        this.closeBtn?.addEventListener("click", this.closeBtnEvent);
        this.addEventListener("click", this.trackingClickEvent);
      }

      attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        this.open = newValue;
        this.focus();
      }

      trackingClickEvent(event: MouseEvent) {
        const curTarget = event.target as Node;
        const navContent = document.querySelector(".web-book-nav__content");
        if (!navContent?.contains(curTarget)) {
          this.closeBtnEvent();
        }
      }

      closeBtnEvent() {
        const booknav = document.querySelector("web-book-nav");
        const navContent = document.querySelector(".web-book-nav__content");
        const navDrawer = document.querySelector("web-navigation-drawer");
        const isOpen = booknav?.hasAttribute("open");
        if (isOpen) {
          booknav?.removeAttribute("open");
          navContent?.setAttribute("aria-expanded", "false");
          navDrawer?.setAttribute("hidden", "");
        }
      }

      escapeKeyEvent(event: KeyboardEvent) {
        if (event.key === "Escape") {
          const navContent = document.querySelector(".web-book-nav__content");
          const booknav = document.querySelector("web-book-nav");
          const navDrawer = document.querySelector("web-navigation-drawer");
          booknav?.removeAttribute("open");
          document.removeEventListener("keyup", this.escapeKeyEvent);
          navContent?.setAttribute("aria-expanded", "false");
          navDrawer?.removeAttribute("hidden");
        }
      }
    }
  );
})();
