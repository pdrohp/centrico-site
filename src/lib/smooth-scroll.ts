import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Started once from Layout.astro. Skipped for people who ask for less motion,
// so the page falls back to native scrolling for them.
export function initSmoothScroll() {
  if (window.__lenis) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.__lenis = new Lenis({ autoRaf: true, anchors: true });
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}
