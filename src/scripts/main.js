import { publicTreatments } from "../data/treatments.public.js";
import { site } from "../data/site.js";
import { composeConsultationMessage, buildWhatsAppUrl } from "./whatsapp.js";
import { initGoalSelector } from "./goal-selector.js";
import { initNavigation } from "./navigation.js";
import { initDisclosures } from "./disclosure.js";
import { initTreatmentDetails } from "./treatment-details.js";
import { initMotion } from "./motion.js";
import { initFill } from "./fill.js";
import { initScroll, initAnchors, scrollToTarget, prewarmImages } from "./scroll.js";

document.documentElement.classList.add("js");
initFill();
const lenis = initScroll();
initNavigation({ onOpen: () => lenis?.stop(), onClose: () => lenis?.start() });
initAnchors();
prewarmImages();
initGoalSelector();
initDisclosures();
initTreatmentDetails();
initMotion();

const bookingForm = document.querySelector("[data-booking-form]");
const treatmentSelect = document.querySelector("#interest");
const feedback = document.querySelector("[data-booking-feedback]");
const messageOutput = document.querySelector("[data-message-output]");

document.querySelectorAll("[data-prepare-treatment]").forEach((button) => {
  button.addEventListener("click", () => {
    if (treatmentSelect) treatmentSelect.value = button.dataset.prepareTreatment;
    scrollToTarget(document.querySelector("#reservar"), { offset: -24 });
    treatmentSelect?.focus({ preventScroll: true });
  });
});

if (
  bookingForm instanceof HTMLFormElement &&
  treatmentSelect instanceof HTMLSelectElement &&
  messageOutput instanceof HTMLTextAreaElement &&
  feedback instanceof HTMLElement
) {
  const nameInput = bookingForm.elements.namedItem("name");
  const preferredDayInput = bookingForm.elements.namedItem("preferred-day");
  const noteInput = bookingForm.elements.namedItem("note");
  const hasRequiredControls =
    nameInput instanceof HTMLInputElement &&
    preferredDayInput instanceof HTMLInputElement &&
    noteInput instanceof HTMLTextAreaElement;

  if (hasRequiredControls) {
    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const slug = treatmentSelect.value;
      const treatment = publicTreatments.find((item) => item.slug === slug);
      const message = composeConsultationMessage({
        treatmentName: treatment?.name,
        name: nameInput.value,
        preferredDay: preferredDayInput.value,
        note: noteInput.value,
      });
      const whatsappUrl = buildWhatsAppUrl(site.whatsappInternational, message);

      messageOutput.value = message;
      messageOutput.hidden = false;
      if (whatsappUrl) {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        feedback.textContent = "Se abrió WhatsApp para enviar tu consulta. Esto no confirma una cita.";
        return;
      }

      try {
        await navigator.clipboard.writeText(message);
        feedback.textContent = "Mensaje copiado. Puedes enviarlo a Naturelle Spa desde sus redes oficiales.";
      } catch {
        feedback.textContent = "Tu mensaje está listo. Cópialo manualmente y envíalo a Naturelle Spa desde sus redes oficiales.";
      }
    });
  }
}
