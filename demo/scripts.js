/*
 * modal.js
 *
 * lumen.css - https://lumen-css.pixel.com.ro
 * Copyright 2025 - Licensed under MIT
 *
 * Requirements (markup):
 *  - Open trigger:  [data-modal-open][data-target="modal-id"]
 *  - Close trigger: [data-modal-close]
 *  - Modal:         <dialog id="modal-id"><article>...</article></dialog>
 *
 * Optional:
 *  - Close only when clicking outside <article> (enabled by default).
 *  - Restore focus to the trigger after close (enabled by default).
 */

(() => {
  "use strict";

  // ---------------------------
  // Config
  // ---------------------------
  const isOpenClass = "modal-is-open";
  const openingClass = "modal-is-opening";
  const closingClass = "modal-is-closing";
  const scrollbarWidthCssVar = "--lumen-scrollbar-width";
  const animationDuration = 400; // ms (should match your CSS timing)

  // State
  let visibleModal = null;
  let lastActiveTrigger = null;

  // ---------------------------
  // Utilities
  // ---------------------------
  const isDialog = (el) =>
      el instanceof HTMLDialogElement ||
      (el && el.nodeName && el.nodeName.toLowerCase() === "dialog");

  const getScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth;

  const isScrollbarVisible = () =>
      document.documentElement.scrollHeight > document.documentElement.clientHeight;

  const setScrollbarCompensation = () => {
    const html = document.documentElement;
    if (!isScrollbarVisible()) return;

    const w = getScrollbarWidth();
    if (w > 0) html.style.setProperty(scrollbarWidthCssVar, `${w}px`);
  };

  const clearScrollbarCompensation = () => {
    document.documentElement.style.removeProperty(scrollbarWidthCssVar);
  };

  const cleanupHtmlClasses = () => {
    const html = document.documentElement;
    html.classList.remove(openingClass, closingClass, isOpenClass);
    clearScrollbarCompensation();
  };

  // ---------------------------
  // Core open/close
  // ---------------------------
  function openModal(modal, trigger = null) {
    if (!modal || !isDialog(modal)) return;

    // Already open? just update state
    if (modal.open) {
      visibleModal = modal;
      return;
    }

    const html = document.documentElement;

    lastActiveTrigger = trigger || document.activeElement;

    setScrollbarCompensation();

    visibleModal = modal;
    html.classList.add(isOpenClass, openingClass);

    // showModal can throw if not supported or if element isn't a <dialog>
    try {
      modal.showModal();
    } catch (err) {
      // Fallback: try basic open attribute (non-modal)
      // Note: not ideal, but prevents "nothing happens" situations.
      try {
        modal.setAttribute("open", "");
      } catch (_) {}
      // Also remove opening state (avoid locking page)
      html.classList.remove(openingClass);
      // You can inspect errors in console:
      console.error("[modal.js] showModal() failed:", err);
      return;
    }

    window.setTimeout(() => {
      html.classList.remove(openingClass);
    }, animationDuration);
  }

  function closeModal(modal, { restoreFocus = true } = {}) {
    if (!modal || !isDialog(modal)) return;

    const html = document.documentElement;

    // If it's not open, just ensure cleanup
    if (!modal.open) {
      if (visibleModal === modal) visibleModal = null;
      html.classList.remove(openingClass, closingClass, isOpenClass);
      clearScrollbarCompensation();
      return;
    }

    html.classList.add(closingClass);

    window.setTimeout(() => {
      try {
        modal.close();
      } catch (err) {
        // Fallback: remove open attribute
        try {
          modal.removeAttribute("open");
        } catch (_) {}
        console.error("[modal.js] close() failed:", err);
      }

      html.classList.remove(closingClass, isOpenClass);
      clearScrollbarCompensation();

      if (visibleModal === modal) visibleModal = null;

      if (
          restoreFocus &&
          lastActiveTrigger &&
          typeof lastActiveTrigger.focus === "function"
      ) {
        lastActiveTrigger.focus({ preventScroll: true });
      }
      lastActiveTrigger = null;
    }, animationDuration);
  }

  function toggleModalById(targetId, trigger = null) {
    if (!targetId) return;
    const modal = document.getElementById(targetId);
    if (!modal) return;

    modal.open ? closeModal(modal) : openModal(modal, trigger);
  }

  // ---------------------------
  // Events
  // ---------------------------

  // Open/Close by data attributes (delegation)
  document.addEventListener("click", (event) => {
    const openBtn = event.target.closest("[data-modal-open][data-target]");
    if (openBtn) {
      event.preventDefault();
      toggleModalById(openBtn.dataset.target, openBtn);
      return;
    }

    const closeBtn = event.target.closest("[data-modal-close]");
    if (closeBtn && visibleModal) {
      event.preventDefault();
      closeModal(visibleModal);
    }
  });

  // Close by clicking outside article (backdrop area)
  // Uses composedPath when available (better for shadow DOM / SVG)
  document.addEventListener("mousedown", (event) => {
    if (!visibleModal) return;

    const article = visibleModal.querySelector("article");
    if (!article) return;

    const path = typeof event.composedPath === "function" ? event.composedPath() : null;
    const clickedInsideArticle = path ? path.includes(article) : article.contains(event.target);

    if (!clickedInsideArticle) closeModal(visibleModal);
  });

  // Close by ESC
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!visibleModal) return;
    closeModal(visibleModal);
  });

  // Defensive cleanup: if dialog closes by native means, remove html lock classes
  document.addEventListener(
      "close",
      (event) => {
        const dlg = event.target;
        if (!isDialog(dlg)) return;

        if (visibleModal === dlg) visibleModal = null;

        // If no other modal is open, cleanup
        cleanupHtmlClasses();
      },
      true
  );

  // Optional: expose a tiny API for manual calls if you want
  window.LumenModal = {
    open: (idOrEl) => {
      const el = typeof idOrEl === "string" ? document.getElementById(idOrEl) : idOrEl;
      openModal(el);
    },
    close: (idOrEl) => {
      const el = typeof idOrEl === "string" ? document.getElementById(idOrEl) : idOrEl;
      closeModal(el);
    },
    toggle: (id) => toggleModalById(id),
    get active() {
      return visibleModal;
    },
  };
})();
/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2024 - Licensed under MIT
 */

const themeSwitcher = {
  // Config
  _scheme: "auto",
  menuTarget: "details.dropdown",
  buttonsTarget: "a[data-theme-switcher]",
  buttonAttribute: "data-theme-switcher",
  rootAttribute: "data-theme",
  localStorageKey: "picoPreferredColorScheme",

  // Init
  init() {
    this.scheme = this.schemeFromLocalStorage;
    this.initSwitchers();
  },

  // Get color scheme from local storage
  get schemeFromLocalStorage() {
    return window.localStorage?.getItem(this.localStorageKey) ?? this._scheme;
  },

  // Preferred color scheme
  get preferredColorScheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  },

  // Init switchers
  initSwitchers() {
    const buttons = document.querySelectorAll(this.buttonsTarget);
    buttons.forEach((button) => {
      button.addEventListener(
          "click",
          (event) => {
            event.preventDefault();
            // Set scheme
            this.scheme = button.getAttribute(this.buttonAttribute);
            // Close dropdown
            document.querySelector(this.menuTarget)?.removeAttribute("open");
          },
          false
      );
    });
  },

  // Set scheme
  set scheme(scheme) {
    if (scheme == "auto") {
      this._scheme = this.preferredColorScheme;
    } else if (scheme == "dark" || scheme == "light") {
      this._scheme = scheme;
    }
    this.applyScheme();
    this.schemeToLocalStorage();
  },

  // Get scheme
  get scheme() {
    return this._scheme;
  },

  // Apply scheme
  applyScheme() {
    document.querySelector("html")?.setAttribute(this.rootAttribute, this.scheme);
  },

  // Store scheme to local storage
  schemeToLocalStorage() {
    window.localStorage?.setItem(this.localStorageKey, this.scheme);
  },
};

// Init
themeSwitcher.init();
