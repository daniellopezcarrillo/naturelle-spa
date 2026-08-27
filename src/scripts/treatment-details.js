export function initTreatmentDetails() {
  const container = document.querySelector("[data-treatment-details]");
  const details = [...document.querySelectorAll("[data-treatment-detail]")];
  const links = [...document.querySelectorAll("[data-view-treatment]")];
  if (!(container instanceof HTMLElement) || details.length === 0) return;

  const activate = (slug, { moveFocus = false } = {}) => {
    const target = details.find((detail) => detail.dataset.treatmentDetail === slug);
    if (!(target instanceof HTMLElement)) return;

    details.forEach((detail) => {
      const active = detail === target;
      detail.hidden = !active;
      detail.toggleAttribute("data-active", active);
    });
    links.forEach((link) => {
      link.toggleAttribute("aria-current", link.dataset.viewTreatment === slug);
    });

    if (moveFocus) {
      const heading = target.querySelector("h3");
      target.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      if (heading instanceof HTMLElement) heading.focus({ preventScroll: true });
    }
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const slug = link.dataset.viewTreatment;
      if (!slug) return;
      event.preventDefault();
      history.pushState(null, "", `#detalle-${slug}`);
      activate(slug, { moveFocus: true });
    });
  });

  window.addEventListener("hashchange", () => {
    const slug = location.hash.startsWith("#detalle-") ? location.hash.slice(9) : "";
    if (slug) activate(slug, { moveFocus: true });
  });

  const initialSlug = location.hash.startsWith("#detalle-")
    ? location.hash.slice(9)
    : details[0].dataset.treatmentDetail;
  activate(initialSlug);
  container.dataset.enhanced = "true";
}
