export function composeTreatmentMessage(treatmentName) {
  return `Hola, vi el tratamiento “${treatmentName}” en la página de Naturelle Spa y me gustaría consultar disponibilidad.`;
}

export function composeValuationMessage() {
  return "Hola, visité la página de Naturelle Spa y me gustaría solicitar una valoración para conocer el tratamiento más adecuado para mi objetivo.";
}

export function sanitizeMessageField(value, maxLength) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function composeConsultationMessage({ treatmentName, name, preferredDay, note }) {
  const safeName = sanitizeMessageField(name, 80);
  const safeDay = sanitizeMessageField(preferredDay, 40);
  const safeNote = sanitizeMessageField(note, 300);
  const lines = [
    treatmentName ? composeTreatmentMessage(treatmentName) : composeValuationMessage(),
    safeName ? `Mi nombre es ${safeName}.` : "",
    safeDay ? `Día preferido: ${safeDay} (sujeto a disponibilidad).` : "",
    safeNote ? `Mensaje adicional: ${safeNote}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

export function buildWhatsAppUrl(phone, message) {
  if (!phone || !/^\d{8,15}$/.test(phone)) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
