import { getPublicTreatmentsByZone } from "../data/treatments.public.js";

export function initGoalSelector() {
  const selector = document.querySelector("[data-goal-selector]");
  const entries = [...document.querySelectorAll("[data-treatment-slug]")];
  const status = document.querySelector("[data-filter-status]");
  const reset = document.querySelector("[data-filter-reset]");
  if (!selector || !status) return;

  const applyFilter = (zone = "") => {
    const matches = new Set(getPublicTreatmentsByZone(zone).map(({ slug }) => slug));
    entries.forEach((entry) => {
      entry.hidden = Boolean(zone) && !matches.has(entry.dataset.treatmentSlug);
    });
    selector.querySelectorAll("button").forEach((button) => {
      const selected = button.dataset.zone === zone;
      button.setAttribute("aria-pressed", String(selected));
    });
    if (reset) reset.hidden = !zone;
    status.textContent = zone
      ? `${matches.size} ${matches.size === 1 ? "tratamiento relacionado" : "tratamientos relacionados"} con ${zone}.`
      : "Mostrando todos los tratamientos.";
  };

  selector.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-zone]");
    if (button) applyFilter(button.dataset.zone);
  });
  reset?.addEventListener("click", () => applyFilter());
}
