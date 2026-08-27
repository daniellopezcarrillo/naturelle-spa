import test from "node:test";
import assert from "node:assert/strict";
import { treatments, getTreatmentsByZone } from "../../src/data/treatments.js";
import { site } from "../../src/data/site.js";
import { buildWhatsAppUrl, composeConsultationMessage, composeTreatmentMessage, composeValuationMessage } from "../../src/scripts/whatsapp.js";

test("the canonical catalog contains ten body treatments and one facial", () => {
  assert.equal(treatments.length, 11);
  assert.equal(treatments.filter(({ type }) => type === "body").length, 10);
  assert.equal(treatments.filter(({ type }) => type === "facial").length, 1);
  assert.ok(treatments.every(({ publicationStatus }) => publicationStatus === "approved"));
  assert.ok(treatments.every(({ includes, technologies, benefits }) => includes && technologies.length && benefits.length));
});

test("zone filtering preserves the documented relationships", () => {
  assert.deepEqual(getTreatmentsByZone("Rostro").map(({ name }) => name), ["Juventud Radiante"]);
  assert.equal(getTreatmentsByZone("Abdomen").length, 5);
  assert.equal(getTreatmentsByZone("Firmeza y textura").length, 4);
});

test("consultation messages do not claim a confirmed reservation", () => {
  const treatment = composeTreatmentMessage("Curvas Definidas");
  const valuation = composeValuationMessage();
  assert.match(treatment, /consultar disponibilidad/);
  assert.doesNotMatch(treatment, /confirmad/i);
  assert.match(valuation, /solicitar una valoración/);
});

test("WhatsApp URLs require a confirmed international number", () => {
  assert.equal(buildWhatsAppUrl(null, "Hola"), null);
  assert.equal(buildWhatsAppUrl("6692384867", "Hola"), "https://wa.me/6692384867?text=Hola");
});

test("authorized business data stays centralized and correctable", () => {
  assert.equal(site.currency, "MXN");
  assert.equal(site.phoneNational, "6692384867");
  assert.equal(site.countryCallingCode, "52");
  assert.equal(site.whatsappInternational, `${site.countryCallingCode}${site.phoneNational}`);
  assert.match(site.phoneAssumptionNote, /corregir/i);
  assert.equal(site.mapUrl, "https://maps.app.goo.gl/HW6WUkGzCBzJ92oT6");
  assert.match(site.appointmentPolicy, /exclusivamente con cita previa/i);
});

test("consultation messages include validated user fields safely", () => {
  const message = composeConsultationMessage({
    treatmentName: "Curvas Definidas",
    name: "  Ana\nMaría  ",
    preferredDay: " sábado ",
    note: "Quiero conocer   disponibilidad.\u0000",
  });
  assert.equal(
    message,
    "Hola, vi el tratamiento “Curvas Definidas” en la página de Naturelle Spa y me gustaría consultar disponibilidad.\nMi nombre es Ana María.\nDía preferido: sábado (sujeto a disponibilidad).\nMensaje adicional: Quiero conocer disponibilidad.",
  );
});
