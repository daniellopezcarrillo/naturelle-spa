import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = 88;
let lenis = null;

export function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function initScroll() {
  if (prefersReducedMotion()) return null;
  ScrollTrigger.config({ ignoreMobileResize: true });
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const getLenis = () => lenis;

export function scrollToTarget(target, { offset = -HEADER_OFFSET } = {}) {
  if (!(target instanceof Element)) return;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

export function initAnchors() {
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href^="#"]');
    if (!link || link.classList.contains("skip-link") || link.hasAttribute("data-view-treatment")) return;
    const id = decodeURIComponent(link.getAttribute("href").slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target, { offset: id === "inicio" ? 0 : -HEADER_OFFSET });
    history.replaceState(null, "", `#${id}`);
  });
}

// Fetch and decode the lazy images one at a time while the browser is idle, so
// scrolling into the roll or the ledger never pays for decoding mid-gesture.
export function prewarmImages() {
  const queue = [...document.querySelectorAll('img[loading="lazy"]')];
  const idle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 120));
  const next = () => {
    const image = queue.shift();
    if (!image) return;
    image.loading = "eager";
    (image.decode?.() ?? Promise.resolve()).catch(() => {}).finally(() => idle(next));
  };
  window.addEventListener("load", () => idle(next), { once: true });
}
