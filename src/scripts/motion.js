import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initRoll } from "./roll.js";
import { LAYOUT_EVENT } from "./goal-selector.js";

gsap.registerPlugin(ScrollTrigger);

const EASE = "expo.out";
const q = (selector, root = document) => root.querySelector(selector);
const qa = (selector, root = document) => [...root.querySelectorAll(selector)];
const once = (trigger, start) => ({ trigger, start, once: true });
// will-change only while a scrubbed section is on screen.
const hot = (element) => ({ onToggle: (self) => { element.style.willChange = self.isActive ? "transform" : "auto"; } });

/**
 * Fold hinges are scrubbed to scroll; reveals play once. Everything starts from the
 * visible, flat default: JS only sets hidden/rotated states here, inside matchMedia,
 * so reduced motion (and no JS) leaves the page flat and fully readable.
 */
export function initMotion() {
  const roll = initRoll();
  if (typeof window === "undefined") return;

  let refreshTimer = null;
  const refreshSoon = () => {
    refreshTimer?.kill();
    refreshTimer = gsap.delayedCall(0.15, () => ScrollTrigger.refresh());
  };

  const mm = gsap.matchMedia();
  mm.add(
    {
      desktop: "(min-width: 1024px)",
      tablet: "(min-width: 600px) and (max-width: 1023.98px)",
      phone: "(max-width: 599.98px)",
      wide: "(min-width: 768px)",
      motion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { desktop, tablet, wide, motion } = context.conditions;
      if (!motion) return undefined;
      // Depth scales the hinge angles: deep on desktop, lighter and shorter on phones.
      const depth = desktop ? 1 : tablet ? 0.75 : 0.5;

      // 1 · Portada: the cloth unfolds on load; the second fold hinges flat with scroll.
      const fold = q("[data-hero-fold]");
      const versoWrap = q("[data-hero-verso-wrap]");
      const verso = q("[data-hero-verso]");
      if (fold) gsap.from(fold, { rotationX: -70 * depth, opacity: 0, transformOrigin: "50% 0%", duration: 1.5, ease: EASE, clearProps: "transform,opacity" });
      if (versoWrap) gsap.from(versoWrap, { rotationX: 80 * depth, opacity: 0, transformOrigin: "50% 0%", duration: 1.7, delay: 0.25, ease: EASE, clearProps: "transform,opacity" });
      if (verso) {
        gsap.fromTo(
          verso,
          { rotationX: 34 * depth, transformOrigin: "50% 0%" },
          { rotationX: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: () => `+=${Math.round(window.innerHeight * 0.55)}`, scrub: true, ...hot(verso) } },
        );
      }
      const principles = qa(".principles li, .hero__motto");
      if (principles.length) gsap.from(principles, { opacity: 0, y: 14, stagger: 0.08, duration: 0.9, delay: 0.9, ease: EASE, clearProps: "transform,opacity" });

      // 2 · Objetivos: band unfolds, tags drop from their rivet, result fold hinges flat.
      const band = q("[data-goals-band]");
      if (band) gsap.from(band, { rotationX: -60 * depth, opacity: 0, transformOrigin: "50% 0%", duration: 1.3, ease: EASE, clearProps: "transform,opacity", scrollTrigger: once(band, "top 88%") });
      const tags = qa(".goal-tags .tag");
      if (tags.length) gsap.from(tags, { rotationX: -90, opacity: 0, transformOrigin: "50% 0%", stagger: 0.09, duration: 1.1, ease: EASE, clearProps: "transform,opacity", scrollTrigger: once(".goal-tags", "top 92%") });
      const result = q("[data-goals-result]");
      if (result) {
        gsap.fromTo(
          result,
          { rotationX: 26 * depth, transformOrigin: "50% 0%" },
          { rotationX: 0, ease: "none", scrollTrigger: { trigger: result, start: "top 96%", end: "top 55%", scrub: true, ...hot(result) } },
        );
      }

      // 3 · Rollo: pinned and scrubbed on desktop; free-running with a gentle offset elsewhere.
      if (roll) roll.enable3d({ pin: desktop, sweep: tablet ? 110 : 80 });

      // 4 · Registro: the ledger unfolds, every row drops from its stitch.
      const ledger = q("[data-ledger]");
      if (ledger) gsap.from(ledger, { rotationX: -50 * depth, opacity: 0, transformOrigin: "50% 0%", duration: 1.3, ease: EASE, clearProps: "transform,opacity", scrollTrigger: once(ledger, "top 90%") });
      qa(".ledger-row").forEach((row) => {
        gsap.from(row, { rotationX: -90 * (desktop ? 1 : 0.7), opacity: 0, transformOrigin: "50% 0%", duration: 1, ease: EASE, clearProps: "transform,opacity", scrollTrigger: once(row, "top 95%") });
      });

      // 5 · Servilleta: the image half opens from the centre crease with scroll.
      const left = q("[data-nap-left]");
      const nap = q("[data-nap]");
      if (left && nap) {
        if (desktop) {
          gsap.fromTo(
            left,
            { rotationY: 150, transformOrigin: "100% 50%" },
            { rotationY: 10, ease: "none", scrollTrigger: { trigger: nap, start: "top 90%", end: "top 25%", scrub: true, ...hot(left) } },
          );
        } else {
          gsap.fromTo(
            left,
            { rotationX: 70 * depth, transformOrigin: "50% 100%" },
            { rotationX: 0, ease: "none", scrollTrigger: { trigger: nap, start: "top 92%", end: "top 45%", scrub: true, ...hot(left) } },
          );
        }
      }

      // Filosofía: statement unfolds, the axes fold hinges open from the crease.
      const statement = q("[data-philosophy-main]");
      const axes = q("[data-philosophy-axes]");
      if (statement) gsap.from(statement, { rotationX: -50 * depth, opacity: 0, transformOrigin: "50% 0%", duration: 1.3, ease: EASE, clearProps: "transform,opacity", scrollTrigger: once(statement, "top 88%") });
      if (axes) {
        gsap.fromTo(
          axes,
          wide ? { rotationY: 70 * depth, transformOrigin: "0% 50%" } : { rotationX: 30 * depth, transformOrigin: "50% 0%" },
          { rotationY: 0, rotationX: 0, ease: "none", scrollTrigger: { trigger: axes, start: "top 92%", end: "top 50%", scrub: true, ...hot(axes) } },
        );
      }

      // 6 · Tecnología: labels sewn on one seam turn on it, one after another.
      const labels = qa("[data-labels] .label");
      labels.forEach((label, index) => {
        const left = wide && index % 2 === 0;
        gsap.from(label, {
          rotationY: wide ? (left ? -80 : 80) : 70,
          opacity: 0,
          transformOrigin: left ? "100% 50%" : "0% 50%",
          delay: index * 0.1,
          duration: 1.1,
          ease: EASE,
          clearProps: "transform,opacity",
          scrollTrigger: once("[data-labels]", "top 88%"),
        });
      });

      // 7 · Protocolo: accordion pleat that stretches open with scroll (stacked flaps on phones).
      const pleats = qa("[data-pleats] .pleat");
      if (pleats.length) {
        if (wide) {
          // One continuous zig-zag strip: every pleat hinges on its left edge, alternating
          // +/- angle, and is shifted so each crease meets the next pleat exactly.
          const list = q("[data-pleats]");
          const apply = (angle) => {
            const width = pleats[0].offsetWidth;
            const rad = (angle * Math.PI) / 180;
            const lost = width * (1 - Math.cos(rad));
            pleats.forEach((pleat, index) => {
              gsap.set(pleat, {
                transformOrigin: "0% 50%",
                rotationY: index % 2 === 0 ? angle : -angle,
                x: -index * lost,
                z: index % 2 === 0 ? 0 : -width * Math.sin(rad),
              });
            });
          };
          const from = 62;
          const to = 14 * depth;
          apply(from);
          ScrollTrigger.create({
            trigger: list,
            start: "top 90%",
            end: "top 35%",
            scrub: true,
            invalidateOnRefresh: true,
            onToggle: (self) => pleats.forEach((pleat) => { pleat.style.willChange = self.isActive ? "transform" : "auto"; }),
            onUpdate: (self) => apply(from + (to - from) * self.progress),
          });
        } else {
          pleats.forEach((pleat) => {
            gsap.from(pleat, { rotationX: -60, opacity: 0, transformOrigin: "50% 0%", duration: 1, ease: EASE, clearProps: "transform,opacity", scrollTrigger: once(pleat, "top 92%") });
          });
        }
      }

      // 8 · Preguntas: flaps drop in; each answer unfolds in CSS when opened.
      const flaps = qa(".faq-item");
      if (flaps.length) gsap.from(flaps, { rotationX: -70 * depth, opacity: 0, transformOrigin: "50% 0%", stagger: 0.12, duration: 1, ease: EASE, clearProps: "transform,opacity", scrollTrigger: once(".faq__items", "top 88%") });

      // 9 · Reserva: the last fold lies down flat.
      const sheet = q("[data-sheet]");
      if (sheet) {
        gsap.fromTo(
          sheet,
          { rotationX: -50 * depth, transformOrigin: "50% 0%" },
          { rotationX: 0, ease: "none", scrollTrigger: { trigger: sheet, start: "top 98%", end: "top 55%", scrub: true, ...hot(sheet) } },
        );
      }

      // Re-flow reactions: filter results re-seat, opened details unfold from their top edge.
      const onLayout = (event) => {
        const { type, element, open } = event.detail ?? {};
        if (type === "detail" && open && element) {
          gsap.fromTo(element, { rotationX: -80, opacity: 0, transformOrigin: "50% 0%" }, { rotationX: 0, opacity: 1, duration: 0.9, ease: EASE, clearProps: "transform,opacity" });
        }
        if (type === "filter") {
          const visible = qa(".goals__list [data-goal-item]").filter((item) => !item.hidden);
          gsap.fromTo(visible, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: EASE, clearProps: "transform,opacity" });
        }
        refreshSoon();
      };
      document.addEventListener(LAYOUT_EVENT, onLayout);

      return () => {
        document.removeEventListener(LAYOUT_EVENT, onLayout);
        roll?.disable3d();
      };
    },
  );

  // Without motion the layout events still change page height; nothing else to do.
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
