import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./scroll.js";

gsap.registerPlugin(ScrollTrigger);

const mod = (value, size) => ((value % size) + size) % size;

/**
 * The linen roll: a CSS 3D cylinder carrying every illustrative image.
 * Without 3D mode (no JS, reduced motion) it stays a flat snap strip that the same
 * buttons and keys scroll. In 3D mode the angle is scroll-driven plus a manual offset
 * from buttons, keyboard and drag.
 */
export function initRoll() {
  const root = document.querySelector("[data-roll]");
  const stage = root?.querySelector("[data-roll-stage]");
  const drum = root?.querySelector("[data-roll-drum]");
  const pinElement = root?.querySelector("[data-roll-pin]");
  const caption = root?.querySelector("[data-roll-caption]");
  const prev = root?.querySelector("[data-roll-prev]");
  const next = root?.querySelector("[data-roll-next]");
  if (!root || !stage || !drum || !pinElement || !caption) return null;

  const items = [...drum.children];
  const count = items.length;
  const step = 360 / count;
  const state = { scroll: 0, manual: 0, index: -1, mode: "strip", aim: null };
  let trigger = null;

  const captionOf = (index) => items[index]?.querySelector("figcaption")?.textContent ?? "";

  const setCaption = (index, { announce = false } = {}) => {
    caption.setAttribute("aria-live", announce ? "polite" : "off");
    caption.textContent = captionOf(index);
    const small = document.createElement("small");
    small.textContent = `${index + 1} de ${count}`;
    caption.append(small);
  };

  const render = () => {
    const total = state.scroll + state.manual;
    gsap.set(drum, { rotationY: -total });
    const index = mod(Math.round(total / step), count);
    if (index !== state.index) {
      state.index = index;
      setCaption(index, { announce: state.announce });
    }
  };

  const snap = () => {
    const total = state.scroll + state.manual;
    const target = Math.round(total / step) * step - state.scroll;
    gsap.to(state, { manual: target, duration: 0.9, ease: "power3.out", overwrite: true, onUpdate: render, onComplete: () => { state.aim = null; } });
  };

  const go = (direction) => {
    state.announce = true;
    if (state.mode === "3d") {
      const total = state.scroll + state.manual;
      state.aim = (state.aim ?? Math.round(total / step)) + direction;
      gsap.to(state, { manual: state.aim * step - state.scroll, duration: 0.9, ease: "power3.out", overwrite: true, onUpdate: render, onComplete: () => { state.aim = null; } });
    } else {
      const width = items[0].getBoundingClientRect().width + 16;
      stage.scrollBy({ left: direction * width, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  prev?.addEventListener("click", () => go(-1));
  next?.addEventListener("click", () => go(1));
  stage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
  });

  // Drag / swipe (3D mode only; vertical page scroll stays native through touch-action).
  let drag = null;
  stage.addEventListener("pointerdown", (event) => {
    if (state.mode !== "3d" || (event.pointerType === "mouse" && event.button !== 0)) return;
    drag = { x: event.clientX, manual: state.manual, id: event.pointerId, active: false };
  });
  stage.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    if (!drag.active && Math.abs(dx) > 6) {
      drag.active = true;
      gsap.killTweensOf(state);
      state.aim = null;
      stage.setPointerCapture?.(event.pointerId);
      stage.classList.add("is-dragging");
    }
    if (drag.active) {
      const spacing = items[0].getBoundingClientRect().width || 150;
      state.announce = true;
      state.manual = drag.manual - dx * (step / spacing) * 0.9;
      render();
    }
  });
  const endDrag = () => {
    if (!drag) return;
    const wasActive = drag.active;
    drag = null;
    stage.classList.remove("is-dragging");
    if (wasActive) snap();
  };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  // Strip mode: keep the caption in step with the item nearest to the centre.
  let frame = 0;
  const syncStrip = () => {
    frame = 0;
    if (state.mode !== "strip") return;
    const box = stage.getBoundingClientRect();
    const centre = box.left + box.width / 2;
    let best = 0;
    let distance = Infinity;
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const d = Math.abs(rect.left + rect.width / 2 - centre);
      if (d < distance) { distance = d; best = index; }
    });
    if (best !== state.index) {
      state.index = best;
      setCaption(best, { announce: state.announce });
    }
  };
  stage.addEventListener("scroll", () => { if (!frame) frame = requestAnimationFrame(syncStrip); }, { passive: true });
  syncStrip();

  const enable3d = ({ pin, sweep }) => {
    state.mode = "3d";
    state.scroll = 0;
    state.manual = 0;
    state.index = -1;
    state.announce = false;
    root.classList.add("roll--3d");
    stage.removeAttribute("tabindex");
    stage.setAttribute("tabindex", "0");
    if (pin) {
      trigger = ScrollTrigger.create({
        trigger: pinElement,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 2.6)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => { drum.style.willChange = self.isActive ? "transform" : "auto"; },
        onUpdate: (self) => { state.announce = false; state.scroll = self.progress * (count - 1) * step; render(); },
      });
    } else {
      trigger = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => { drum.style.willChange = self.isActive ? "transform" : "auto"; },
        onUpdate: (self) => { state.announce = false; state.scroll = self.progress * sweep; render(); },
      });
    }
    render();
  };

  const disable3d = () => {
    trigger?.kill();
    trigger = null;
    gsap.killTweensOf(state);
    state.mode = "strip";
    state.index = -1;
    root.classList.remove("roll--3d");
    gsap.set(drum, { clearProps: "transform" });
    syncStrip();
  };

  return { enable3d, disable3d };
}
