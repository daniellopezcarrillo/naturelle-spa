import { readFile, writeFile } from "node:fs/promises";
import { treatments, treatmentZones } from "../src/data/treatments.js";
import { faqItems } from "../src/data/faq.js";
import { site } from "../src/data/site.js";
import { buildWhatsAppUrl, composeTreatmentMessage, composeValuationMessage } from "../src/scripts/whatsapp.js";

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const formatMoney = (value) => `$${Number(value).toLocaleString("es-MX")} MXN`;
const treatmentMediaShapes = ["lens", "arch", "botanical"];

const renderPrices = (treatment) => {
  const individual = treatment.individualPrice === null
    ? ""
    : `<li><span>Sesión individual</span><strong>${formatMoney(treatment.individualPrice)}</strong></li>`;
  const packages = treatment.packages.map(({ sessions, price }) =>
    `<li><span>${sessions} sesiones</span><strong>${formatMoney(price)}</strong></li>`).join("");
  return `<ul class="treatment-detail__prices">${individual}${packages}</ul>`;
};

const renderTechnologies = (treatment) => {
  if (!treatment.technologies?.length) {
    return "<p>No se especificaron materiales o tecnologías adicionales.</p>";
  }
  return `<ul class="tag-list">${treatment.technologies.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};

const renderTreatment = (treatment, index) => {
  const number = String(index + 1).padStart(2, "0");
  const mediaShape = treatmentMediaShapes[index % treatmentMediaShapes.length];
  const duration = treatment.duration
    ? `<span><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>${escapeHtml(treatment.duration)}</span>`
    : "";
  const startingPrice = treatment.individualPrice ?? treatment.packages[0]?.price;
  const price = startingPrice ? `<span>${formatMoney(startingPrice)}</span>` : "";
  return `
    <article class="treatment-story" data-treatment-slug="${escapeHtml(treatment.slug)}" data-zones="${escapeHtml(treatment.zones.join("|"))}">
      <figure class="treatment-story__media" data-media-shape="${mediaShape}">
        <picture>
          <source srcset="${escapeHtml(treatment.image.path.replace(/\.png$/i, ".avif"))}" type="image/avif" />
          <source srcset="${escapeHtml(treatment.image.path.replace(/\.png$/i, ".webp"))}" type="image/webp" />
          <img src="${escapeHtml(treatment.image.path)}" width="1122" height="1402" loading="lazy" decoding="async" alt="${escapeHtml(treatment.image.alt)}" />
        </picture>
        <figcaption aria-hidden="true">${number} · ${escapeHtml(treatment.category)}</figcaption>
      </figure>
      <div class="treatment-story__content">
        <p class="section-kicker">${escapeHtml(treatment.category)}</p>
        <h3>${escapeHtml(treatment.name)}</h3>
        <p class="treatment-story__technical">${escapeHtml(treatment.technicalName)}</p>
        <p class="treatment-story__description">${escapeHtml(treatment.description)}</p>
        <div class="treatment-story__meta">${duration}${price}</div>
        <div class="treatment-story__actions">
          <a class="text-action" href="#detalle-${escapeHtml(treatment.slug)}" data-view-treatment="${escapeHtml(treatment.slug)}">Ver tratamiento <span aria-hidden="true">↓</span></a>
          <button class="quiet-action" type="button" data-prepare-treatment="${escapeHtml(treatment.slug)}" aria-label="Preparar cita sobre ${escapeHtml(treatment.name)}">Preparar cita</button>
        </div>
      </div>
    </article>`;
};

const renderTreatmentDetail = (treatment, index) => {
  const message = composeTreatmentMessage(treatment.name);
  const whatsappUrl = buildWhatsAppUrl(site.whatsappInternational, message);
  const duration = treatment.duration ?? "Consultar duración al reservar";
  const benefits = treatment.benefits?.length
    ? `<ul>${treatment.benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("")}</ul>`
    : "<p>La información suministrada no detalla beneficios adicionales.</p>";
  return `
    <article class="treatment-detail" id="detalle-${escapeHtml(treatment.slug)}" data-treatment-detail="${escapeHtml(treatment.slug)}"${index === 0 ? " data-active" : ""}>
      <div class="treatment-detail__header">
        <p class="section-kicker">${escapeHtml(treatment.category)} · ${escapeHtml(treatment.technicalName)}</p>
        <h3 tabindex="-1">${escapeHtml(treatment.name)}</h3>
        <a class="button button--primary" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener noreferrer">Pedir cita por WhatsApp</a>
      </div>
      <div class="treatment-detail__facts">
        <section><h4>Qué es</h4><p>${escapeHtml(treatment.description)}</p></section>
        <section><h4>Duración</h4><p>${escapeHtml(duration)}</p></section>
        <section><h4>Qué incluye</h4><p>${escapeHtml(treatment.includes || "La información disponible no detalla elementos adicionales.")}</p></section>
        <section><h4>Tecnología y materiales mencionados</h4>${renderTechnologies(treatment)}</section>
        <section><h4>Beneficios suministrados</h4>${benefits}</section>
        <section><h4>Precios</h4>${renderPrices(treatment)}${treatment.disclaimer ? `<p class="detail-note">${escapeHtml(treatment.disclaimer)}</p>` : ""}</section>
      </div>
      <p class="treatment-detail__appointment">${escapeHtml(site.appointmentPolicy)} Enviar el mensaje inicia una conversación y no confirma la cita.</p>
    </article>`;
};

const template = await readFile("src/index.template.html", "utf8");
const facialTreatment = treatments.find(({ type }) => type === "facial");
const valuationUrl = buildWhatsAppUrl(site.whatsappInternational, composeValuationMessage());

const html = template
  .replace("<!-- TREATMENT_FILTERS -->", treatmentZones.map((zone) => `<button type="button" data-zone="${escapeHtml(zone)}" aria-pressed="false">${escapeHtml(zone)}</button>`).join("\n"))
  .replace("<!-- BODY_TREATMENTS -->", treatments.map(renderTreatment).join("\n"))
  .replace("<!-- FACIAL_TREATMENT_NAME -->", escapeHtml(facialTreatment.name))
  .replaceAll("<!-- FACIAL_TREATMENT_TECHNICAL -->", escapeHtml(facialTreatment.technicalName))
  .replaceAll("<!-- FACIAL_TREATMENT_SLUG -->", escapeHtml(facialTreatment.slug))
  .replace("<!-- TREATMENT_OPTIONS -->", treatments.map(({ slug, name }) => `<option value="${escapeHtml(slug)}">${escapeHtml(name)}</option>`).join("\n"))
  .replace("<!-- TREATMENT_DETAILS -->", treatments.map(renderTreatmentDetail).join("\n"))
  .replaceAll("<!-- WHATSAPP_URL -->", escapeHtml(valuationUrl))
  .replaceAll("<!-- MAP_URL -->", escapeHtml(site.mapUrl))
  .replaceAll("<!-- FACEBOOK_URL -->", escapeHtml(site.social.facebook))
  .replaceAll("<!-- INSTAGRAM_URL -->", escapeHtml(site.social.instagram))
  .replaceAll("<!-- PHONE_DISPLAY -->", escapeHtml(site.phoneNational))
  .replace("<!-- FAQ_ITEMS -->", faqItems.map((item, index) => `
    <details class="faq-item" data-exclusive>
      <summary><span>${escapeHtml(item.question)}</span><span class="faq-item__mark" aria-hidden="true">+</span></summary>
      <div class="faq-item__answer"><p>${escapeHtml(item.answer)}</p></div>
    </details>`).join("\n"))
  .replace("<!-- FAQ_SCHEMA -->", JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }));

await writeFile("index.html", html, "utf8");
const publicTreatmentIndex = treatments.map(({ slug, name, zones, type }) => ({ slug, name, zones, type }));
await writeFile(
  "src/data/treatments.public.js",
  `// Generated from src/data/treatments.js. Do not edit manually.\nexport const publicTreatments = ${JSON.stringify(publicTreatmentIndex, null, 2)};\n\nexport function getPublicTreatmentsByZone(zone) {\n  if (!zone) return publicTreatments;\n  return publicTreatments.filter((treatment) => treatment.zones.includes(zone));\n}\n`,
  "utf8",
);
console.log(`Generated index.html with ${treatments.length} treatments.`);
