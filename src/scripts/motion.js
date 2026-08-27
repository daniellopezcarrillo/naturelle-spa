const REVEAL_SELECTORS = [
  ".gallery-block",
  ".philosophy__axes article",
  ".technology",
  ".protocol__steps li",
  ".faq-item",
  ".booking__aside",
  ".booking-form",
  ".contact__grid",
];

const HERO_STAGGER = [
  ".hero__brand-logo",
  ".hero__label",
  ".hero h1",
  ".hero__intro",
  ".hero__actions",
  ".hero__signature",
];

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function markHeroElements() {
  const hero = document.querySelector(".hero");
  if (!hero) return [];

  const elements = HERO_STAGGER.map((selector) => hero.querySelector(selector)).filter(Boolean);
  elements.forEach((element, index) => {
    element.classList.add("motion-hero-item");
    element.style.setProperty("--motion-index", index);
  });

  const image = hero.querySelector(".hero__image");
  if (image) image.classList.add("motion-hero-image");
  return [...elements, image].filter(Boolean);
}

function markRevealElements() {
  const elements = REVEAL_SELECTORS.flatMap((selector) => [...document.querySelectorAll(selector)]);
  elements.forEach((element) => element.classList.add("motion-reveal"));
  return elements;
}

function reveal(element) {
  element.classList.add("is-visible");
}

export function initMotion() {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  const heroElements = markHeroElements();
  const revealElements = markRevealElements();
  const allElements = [...heroElements, ...revealElements];
  if (!allElements.length) return;

  document.documentElement.classList.add("motion-enabled");

  // The authored hero entrance plays once, immediately, with a restrained stagger.
  const schedule = window.requestAnimationFrame ?? ((callback) => window.setTimeout(callback, 0));
  schedule(() => {
    heroElements.forEach(reveal);
  });

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  revealElements.forEach((element) => observer.observe(element));
}
