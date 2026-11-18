import { readFile, writeFile } from "node:fs/promises";
import { treatments } from "../src/data/treatments.js";
import { faqItems } from "../src/data/faq.js";
import { site } from "../src/data/site.js";
import { buildWhatsAppUrl, composeTreatmentMessage, composeValuationMessage } from "../src/scripts/whatsapp.js";

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const formatNumber = (value) => `$${Number(value).toLocaleString("es-MX")}`;
const formatMoney = (value) => `${formatNumber(value)} MXN`;

// Goal ids live in the treatment data (`goals`); labels are presentation only.
const goalLabels = [
  ["reafirmar", "Reafirmar"],
  ["reducir", "Reducir"],
  ["moldear", "Moldear"],
  ["mejorar-textura", "Mejorar textura"],
  ["rostro", "Rostro"],
];

const plusIcon = '<svg class="icon-plus" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14"/><path class="icon-plus__bar" d="M12 5v14"/></svg>';
const arrowIcon = (direction) => `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${direction === "next" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}"/></svg>`;

const priceLabel = (treatment, prefix = "") => treatment.individualPrice === null && treatment.packages[0]
  ? `${treatment.packages[0].sessions} sesiones ${formatMoney(treatment.packages[0].price)}`
  : `${prefix}${formatMoney(startingPrice(treatment))}`;
const price = (treatment) => `<span class="nw">${priceLabel(treatment)}</span>`;
const startingPrice = (treatment) => treatment.individualPrice ?? treatment.packages[0]?.price;

const picture = (path, { alt, width = 1122, height = 1402, lazy = true, className = "" }) => {
  const base = path.replace(/\.(png|webp)$/i, "");
  const fallback = /\.png$/i.test(path) ? path : path;
  const classAttr = className ? ` class="${className}"` : "";
  const loading = lazy ? ' loading="lazy" decoding="async"' : "";
  return `<picture${classAttr}><source srcset="${escapeHtml(base)}.avif" type="image/avif" /><source srcset="${escapeHtml(base)}.webp" type="image/webp" /><img src="${escapeHtml(fallback)}" width="${width}" height="${height}"${loading} alt="${escapeHtml(alt)}" /></picture>`;
};

const renderGoalTags = () => goalLabels.map(([id, label]) => {
  const count = treatments.filter(({ goals }) => goals.includes(id)).length;
  return `<button class="tag" type="button" data-goal="${id}" data-goal-label="${escapeHtml(label)}" aria-pressed="false" data-fill><b>${escapeHtml(label)}</b><span>${count} ${count === 1 ? "tratamiento" : "tratamientos"}</span></button>`;
}).join("\n");

const renderHeroRow = (treatment) => {
  const duration = treatment.duration ? `<span class="nw">${escapeHtml(treatment.duration)}</span>` : "";
  return `<li><a class="mini-row" href="#detalle-${escapeHtml(treatment.slug)}" data-view-treatment="${escapeHtml(treatment.slug)}">${picture(treatment.image.path, { alt: "" })}<span><b>${escapeHtml(treatment.name)}</b><small class="meta">${duration}<span class="nw">${priceLabel(treatment, "desde ")}</span></small></span></a></li>`;
};

const renderGoalResult = (treatment) => `
          <li data-goal-item data-goals="${escapeHtml(treatment.goals.join("|"))}"><a class="mini-row" href="#detalle-${escapeHtml(treatment.slug)}" data-view-treatment="${escapeHtml(treatment.slug)}">${picture(treatment.image.path, { alt: "" })}<span><b>${escapeHtml(treatment.name)}</b><small class="meta"><span>${escapeHtml(treatment.technicalName)}</span>${price(treatment)}</small></span></a></li>`;

const renderPrices = (treatment) => {
  const individual = treatment.individualPrice === null
    ? ""
    : `<li><span>Sesión individual</span><strong>${formatMoney(treatment.individualPrice)}</strong></li>`;
  const packages = treatment.packages.map(({ sessions, price }) =>
    `<li><span>${sessions} sesiones</span><strong>${formatMoney(price)}</strong></li>`).join("");
  return `<ul class="detail-prices">${individual}${packages}</ul>`;
};

const renderTechnologies = (treatment) => {
  if (!treatment.technologies?.length) {
    return "<p>No se especificaron materiales o tecnologías adicionales.</p>";
  }
  return `<ul class="tag-list">${treatment.technologies.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
};

const renderDetail = (treatment) => {
  const message = composeTreatmentMessage(treatment.name);
  const whatsappUrl = buildWhatsAppUrl(site.whatsappInternational, message);
  const duration = treatment.duration ?? "Consultar duración al reservar";
  const benefits = treatment.benefits?.length
    ? `<ul>${treatment.benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("")}</ul>`
    : "<p>La información suministrada no detalla beneficios adicionales.</p>";
  return `
        <div class="ledger-row__detail" id="detalle-${escapeHtml(treatment.slug)}" role="region" aria-label="Detalle de ${escapeHtml(treatment.name)}" data-treatment-detail="${escapeHtml(treatment.slug)}">
          <div class="detail-grid">
            <section><h4>Qué es</h4><p>${escapeHtml(treatment.description)}</p><h4>Duración</h4><p>${escapeHtml(duration)}</p></section>
            <section><h4>Qué incluye</h4><p>${escapeHtml(treatment.includes || "La información disponible no detalla elementos adicionales.")}</p><h4>Tecnología y materiales mencionados</h4>${renderTechnologies(treatment)}</section>
            <section><h4>Beneficios suministrados</h4>${benefits}</section>
            <section><h4>Precios</h4>${renderPrices(treatment)}${treatment.disclaimer ? `<p class="detail-note">${escapeHtml(treatment.disclaimer)}</p>` : ""}</section>
          </div>
          <div class="detail-actions">
            <a class="btn btn--primary" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener noreferrer">Pedir cita por WhatsApp</a>
            <button class="btn btn--ghost" type="button" data-prepare-treatment="${escapeHtml(treatment.slug)}" aria-label="Preparar cita sobre ${escapeHtml(treatment.name)}">Preparar cita</button>
          </div>
          <p class="detail-appointment">${escapeHtml(site.appointmentPolicy)} Enviar el mensaje inicia una conversación y no confirma la cita.</p>
        </div>`;
};

const renderLedgerRow = (treatment) => {
  const sessionPrice = treatment.individualPrice === null ? "—" : formatNumber(treatment.individualPrice);
  const packages = treatment.packages.length
    ? treatment.packages.map(({ sessions, price }) => `<span class="pkg"><span class="sr-only">${sessions} sesiones, </span>${sessions} · ${formatNumber(price)}</span>`).join("")
    : "—";
  const duration = treatment.duration ? escapeHtml(treatment.duration) : "Al reservar";
  return `
      <article class="ledger-row" data-treatment-slug="${escapeHtml(treatment.slug)}" data-goal-item data-goals="${escapeHtml(treatment.goals.join("|"))}" data-zones="${escapeHtml(treatment.zones.join("|"))}">
        <h3 class="ledger-row__head">
          <button class="ledger-row__toggle" type="button" data-fill aria-expanded="false" aria-controls="detalle-${escapeHtml(treatment.slug)}" aria-label="${escapeHtml(treatment.name)}, ver detalle del tratamiento">
            ${picture(treatment.image.path, { alt: treatment.image.alt, className: "ledger-row__thumb" })}
            <span class="ledger-row__name">${escapeHtml(treatment.name)}</span>
            <span class="ledger-row__cell" data-label="Técnica">${escapeHtml(treatment.technicalName)}</span>
            <span class="ledger-row__cell" data-label="Duración">${duration}</span>
            <span class="ledger-row__cell ledger-row__num" data-label="Sesión">${sessionPrice}</span>
            <span class="ledger-row__cell ledger-row__pkgs" data-label="Paquetes">${packages}</span>
            <span class="ledger-row__mark" aria-hidden="true">${plusIcon}</span>
          </button>
        </h3>${renderDetail(treatment)}
      </article>`;
};

// Seven techniques, counted from each treatment's own `technologies` list.
const techniques = [
  ["Radiofrecuencia", '<path d="M4 12c2-4 4-4 6 0s4 4 6 0 3-3 4-1"/><path d="M4 17c2-3 4-3 6 0s4 3 6 0"/>', "radiofrecuencia"],
  ["Cavitación 40K", '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="10"/>', "cavitación"],
  ["Vacuunterapia", '<path d="M5 14a7 7 0 0 1 14 0Z"/><path d="M12 7V4M9.5 4h5M4 17.5h16"/>', "vacuunterapia"],
  ["Lipoláser", '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="2.5"/>', "lipoláser"],
  ["Infrarrojos", '<path d="M6 20c0-5 3-6 3-10s-2-5-2-7M12 20c0-5 3-6 3-10s-2-5-2-7M18 20c0-5 3-6 3-10"/>', "infrarrojos"],
  ["Maderoterapia", '<path d="M8 7.5h8a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 15V9A1.5 1.5 0 0 1 8 7.5Z"/><path d="M10 7.5v9M14 7.5v9M3 12h3.5M17.5 12H21"/>', "maderoterapia"],
  ["Martillo frío", '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/>', "martillo frío"],
];
const renderTechLabels = () => techniques.map(([name, icon, key]) => {
  const count = treatments.filter(({ technologies }) => technologies.some((item) => item.toLowerCase().includes(key))).length;
  return `<li class="label"><svg aria-hidden="true" viewBox="0 0 24 24">${icon}</svg><b>${escapeHtml(name)}</b><small>${count} de ${treatments.length} protocolos</small></li>`;
}).join("\n");

const rollExtras = [
  { path: "/images/generated/hero-botanical-still-life.webp", caption: "Bodegón botánico", alt: "", width: 1000, height: 1250 },
  { path: "/images/generated/gallery/facial/facial-juventud-radiante-illustrative.png", caption: "Juventud Radiante", alt: "Imagen ilustrativa de una mujer en un espacio de spa.", width: 1536, height: 1024 },
  { path: "/images/generated/gallery/facial/facial-cooling-care.png", caption: "Martillo frío facial", alt: "Composición ilustrativa asociada con el cuidado facial y el martillo frío.", width: 1024, height: 1536 },
  { path: "/images/generated/gallery/facial/facial-radiofrequency.png", caption: "Radiofrecuencia facial", alt: "Composición ilustrativa asociada con radiofrecuencia facial.", width: 1536, height: 1024 },
  { path: "/images/generated/gallery/body/body-aesthetic-massage-illustrative.png", caption: "Experiencia corporal", alt: "Escena ilustrativa de una experiencia de masaje corporal con la persona completamente cubierta.", width: 1122, height: 1402 },
  { path: "/images/generated/gallery/body/body-maderotherapy-still-life.png", caption: "Maderoterapia", alt: "Composición ilustrativa de herramientas de madera asociadas con maderoterapia.", width: 1024, height: 1536 },
];

const renderRollItems = () => {
  const items = [
    ...treatments.map((treatment) => ({ path: treatment.image.path, caption: treatment.name, alt: treatment.image.alt, width: 1122, height: 1402 })),
    ...rollExtras,
  ];
  const total = items.length;
  const html = items.map((item, index) => `
          <figure class="roll__item" style="--i:${index}" role="group" aria-roledescription="diapositiva" aria-label="${index + 1} de ${total}">${picture(item.path, { alt: item.alt, width: item.width, height: item.height })}<figcaption>${escapeHtml(item.caption)}</figcaption></figure>`).join("");
  return { html, total };
};

const template = await readFile("src/index.template.html", "utf8");
const facialTreatment = treatments.find(({ type }) => type === "facial");
const valuationUrl = buildWhatsAppUrl(site.whatsappInternational, composeValuationMessage());
const roll = renderRollItems();

const facialPrices = [
  facialTreatment.individualPrice === null ? "" : `<dt>Sesión</dt><dd>${formatMoney(facialTreatment.individualPrice)}</dd>`,
  ...facialTreatment.packages.map(({ sessions, price }) => `<dt>${sessions} sesiones</dt><dd>${formatMoney(price)}</dd>`),
].join("");

const html = template
  .replace("<!-- TREATMENT_FILTERS -->", renderGoalTags())
  .replace("<!-- TECH_LABELS -->", renderTechLabels())
  .replace("<!-- HERO_TREATMENTS -->", treatments.slice(0, 3).map(renderHeroRow).join("\n"))
  .replace("<!-- GOAL_RESULTS -->", treatments.map(renderGoalResult).join(""))
  .replace("<!-- ROLL_COUNT -->", String(roll.total))
  .replace("<!-- ROLL_ITEMS -->", roll.html)
  .replace("<!-- TREATMENT_LEDGER -->", treatments.map(renderLedgerRow).join("\n"))
  .replace("<!-- FACIAL_TREATMENT_NAME -->", escapeHtml(facialTreatment.name))
  .replace("<!-- FACIAL_PRICES -->", facialPrices)
  .replaceAll("<!-- FACIAL_TREATMENT_TECHNICAL -->", escapeHtml(facialTreatment.technicalName))
  .replaceAll("<!-- FACIAL_TREATMENT_SLUG -->", escapeHtml(facialTreatment.slug))
  .replace("<!-- TREATMENT_OPTIONS -->", treatments.map(({ slug, name }) => `<option value="${escapeHtml(slug)}">${escapeHtml(name)}</option>`).join("\n"))
  .replaceAll("<!-- WHATSAPP_URL -->", escapeHtml(valuationUrl))
  .replaceAll("<!-- MAP_URL -->", escapeHtml(site.mapUrl))
  .replaceAll("<!-- FACEBOOK_URL -->", escapeHtml(site.social.facebook))
  .replaceAll("<!-- INSTAGRAM_URL -->", escapeHtml(site.social.instagram))
  .replaceAll("<!-- PHONE_DISPLAY -->", escapeHtml(site.phoneNational))
  .replace("<!-- FAQ_ITEMS -->", faqItems.map((item, index) => `
    <details class="faq-item" data-exclusive${index === 0 ? " open" : ""}>
      <summary><span>${escapeHtml(item.question)}</span>${plusIcon}</summary>
      <div class="faq-item__answer"><p>${escapeHtml(item.answer)}</p></div>
    </details>`).join("\n"))
  .replace("<!-- ARROW_PREV -->", arrowIcon("prev"))
  .replace("<!-- ARROW_NEXT -->", arrowIcon("next"))
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
const publicTreatmentIndex = treatments.map(({ slug, name, zones, goals, type }) => ({ slug, name, zones, goals, type }));
await writeFile(
  "src/data/treatments.public.js",
  `// Generated from src/data/treatments.js. Do not edit manually.\nexport const publicTreatments = ${JSON.stringify(publicTreatmentIndex, null, 2)};\n\nexport function getPublicTreatmentsByZone(zone) {\n  if (!zone) return publicTreatments;\n  return publicTreatments.filter((treatment) => treatment.zones.includes(zone));\n}\n\nexport function getPublicTreatmentsByGoal(goal) {\n  if (!goal) return publicTreatments;\n  return publicTreatments.filter((treatment) => treatment.goals.includes(goal));\n}\n`,
  "utf8",
);
console.log(`Generated index.html with ${treatments.length} treatments.`);
