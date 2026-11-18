import { LAYOUT_EVENT } from "./goal-selector.js";
import { scrollToTarget } from "./scroll.js";

// The ledger row unfolds its own detail in place; one row is open at a time.
export function initTreatmentDetails() {
  const container = document.querySelector("[data-treatment-details]");
  const rows = [...document.querySelectorAll(".ledger-row")];
  const links = [...document.querySelectorAll("[data-view-treatment]")];
  if (!(container instanceof HTMLElement) || rows.length === 0) return;

  const parts = (row) => ({
    button: row.querySelector(".ledger-row__toggle"),
    detail: row.querySelector(".ledger-row__detail"),
  });

  const setOpen = (row, open) => {
    const { button, detail } = parts(row);
    if (!button || !detail) return;
    if (open === !detail.hidden) return;
    detail.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    row.classList.toggle("is-open", open);
    document.dispatchEvent(new CustomEvent(LAYOUT_EVENT, { detail: { type: "detail", element: detail, open } }));
  };

  rows.forEach((row) => {
    const { button, detail } = parts(row);
    if (detail) detail.hidden = true;
    button?.addEventListener("click", () => {
      const willOpen = detail.hidden;
      rows.forEach((other) => { if (other !== row) setOpen(other, false); });
      setOpen(row, willOpen);
    });
  });

  const view = (slug, { moveFocus = true } = {}) => {
    const row = rows.find((item) => item.dataset.treatmentSlug === slug);
    if (!row) return;
    if (row.hidden) document.querySelector("[data-filter-reset]")?.click();
    rows.forEach((other) => { if (other !== row) setOpen(other, false); });
    setOpen(row, true);
    scrollToTarget(row);
    if (moveFocus) parts(row).button?.focus({ preventScroll: true });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const slug = link.dataset.viewTreatment;
      if (!slug) return;
      event.preventDefault();
      history.pushState(null, "", `#detalle-${slug}`);
      view(slug);
    });
  });

  window.addEventListener("hashchange", () => {
    if (location.hash.startsWith("#detalle-")) view(location.hash.slice(9));
  });

  if (location.hash.startsWith("#detalle-")) {
    const slug = location.hash.slice(9);
    window.addEventListener("load", () => view(slug, { moveFocus: false }), { once: true });
  }
  container.dataset.enhanced = "true";
}
