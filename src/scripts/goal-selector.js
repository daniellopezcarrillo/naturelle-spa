export const LAYOUT_EVENT = "naturelle:layout";

// Filters by the `goals` field of each treatment (ids: reafirmar, reducir, moldear,
// mejorar-textura, rostro), carried on the markup as data-goals.
export function initGoalSelector() {
  const selector = document.querySelector("[data-goal-selector]");
  const items = [...document.querySelectorAll("[data-goal-item]")];
  const rows = items.filter((item) => item.matches(".ledger-row"));
  const status = document.querySelector("[data-filter-status]");
  const reset = document.querySelector("[data-filter-reset]");
  if (!selector || !status) return;

  const applyFilter = (goal = "", label = "") => {
    items.forEach((item) => {
      const goals = (item.dataset.goals ?? "").split("|");
      item.hidden = Boolean(goal) && !goals.includes(goal);
    });
    selector.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.goal === goal));
    });
    if (reset) reset.hidden = !goal;
    const count = rows.filter((row) => !row.hidden).length;
    status.textContent = goal
      ? `${count} ${count === 1 ? "tratamiento relacionado" : "tratamientos relacionados"} con ${label}.`
      : "Mostrando todos los tratamientos.";
    document.dispatchEvent(new CustomEvent(LAYOUT_EVENT, { detail: { type: "filter" } }));
  };

  selector.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-goal]");
    if (!button) return;
    if (button.getAttribute("aria-pressed") === "true") applyFilter();
    else applyFilter(button.dataset.goal, button.dataset.goalLabel ?? button.textContent);
  });
  reset?.addEventListener("click", () => applyFilter());
}
