export function initDisclosures() {
  document.querySelectorAll("details[data-exclusive]").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      const group = details.closest("[data-disclosure-group]");
      group?.querySelectorAll("details[data-exclusive][open]").forEach((other) => {
        if (other !== details) other.removeAttribute("open");
      });
    });
  });
}
