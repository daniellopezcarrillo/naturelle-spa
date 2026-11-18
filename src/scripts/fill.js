const SELECTOR = ".btn, .tag, [data-fill]";

// Every pill, round button and tag shares one "dye" fill: a clip-path circle that
// grows from the point where the pointer entered and drains out through the exit point.
export function initFill() {
  document.querySelectorAll(SELECTOR).forEach((element) => {
    if (element.querySelector(":scope > .btn__fill")) return;
    const fill = document.createElement("span");
    fill.className = "btn__fill";
    fill.setAttribute("aria-hidden", "true");
    element.append(fill);
  });

  const track = (event) => {
    const element = event.target.closest?.(SELECTOR);
    if (!element || element.contains(event.relatedTarget)) return;
    const box = element.getBoundingClientRect();
    element.style.setProperty("--x", `${event.clientX - box.left}px`);
    element.style.setProperty("--y", `${event.clientY - box.top}px`);
  };
  document.addEventListener("pointerover", track, { passive: true });
  document.addEventListener("pointerout", track, { passive: true });
}
