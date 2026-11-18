import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { initHeaderCompaction } from "../../src/scripts/navigation.js";
import { treatments } from "../../src/data/treatments.js";

test("navigation falls back safely without IntersectionObserver", () => {
  const added = [];
  const header = { classList: { add: (value) => added.push(value) } };
  assert.doesNotThrow(() => initHeaderCompaction(header, null, undefined));
  assert.deepEqual(added, ["is-compact"]);
});

test("the hero keeps exactly three documented principles and no kicker labels", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  const list = source.match(/<ul class="principles"[\s\S]*?<\/ul>/)?.[0] ?? "";
  assert.equal((list.match(/<li>/g) ?? []).length, 3);
  assert.doesNotMatch(list, /Consulta directa/);
  assert.doesNotMatch(source, /section-kicker/);
});

test("focus, selection, scrollbar and field borders come from the palette", async () => {
  const base = await readFile("src/styles/base.css", "utf8");
  const sections = await readFile("src/styles/sections.css", "utf8");
  assert.match(base, /:focus-visible \{[^}]*outline: 2px solid var\(--focus\)/);
  assert.match(base, /::selection/);
  assert.match(base, /scrollbar-color/);
  assert.match(sections, /border: 1px solid #6b6f55/);
  assert.doesNotMatch(sections, /transition:\s*height/);
});

test("buttons share one dye-fill component with pointer tracking", async () => {
  const components = await readFile("src/styles/components.css", "utf8");
  const fill = await readFile("src/scripts/fill.js", "utf8");
  assert.match(components, /\.btn__fill \{[^}]*clip-path: circle\(0 at var\(--x\) var\(--y\)\)/s);
  assert.match(components, /border-radius: 999px/);
  assert.match(components, /\.btn--round/);
  assert.match(components, /prefers-reduced-motion: reduce/);
  assert.match(fill, /--x/);
  assert.match(fill, /pointerover/);
});

test("official brand and gallery assets preserve accessible descriptions", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  // Header, mobile menu and footer draw the official silhouette through its own alpha (no box), with the name beside it in the header.
  assert.equal((source.match(/class="brand-mark/g) ?? []).length, 3);
  assert.match(source, /<span class="wordmark__name">Naturelle Spa<\/span>/);
  const components = await readFile("src/styles/components.css", "utf8");
  assert.match(components, /mask: url\("\/images\/brand\/naturelle-spa-silhouette\.png"\)/);
  // The development direction contract never ships in page source.
  assert.doesNotMatch(source, /THESIS:|OWN-WORLD:/);
  assert.match(source, /facial-juventud-radiante-illustrative\.avif/);
  assert.match(source, /alt="Imagen ilustrativa de una mujer en un espacio de spa."/);
  assert.match(source, /<!-- MAP_URL -->/);
  assert.match(source, /<!-- WHATSAPP_URL -->/);
});

test("all approved treatments map to generated assets with grounded alt text", async () => {
  const manifest = JSON.parse(await readFile("public/images/generated/gallery/treatments/treatment-image-prompts.json", "utf8"));
  assert.equal(treatments.length, 11);
  assert.equal(manifest.treatments.length, treatments.length);

  for (const treatment of treatments) {
    const manifestEntry = manifest.treatments.find(({ id }) => id === treatment.slug);
    assert.ok(manifestEntry, `${treatment.slug} is missing from the image manifest`);
    assert.equal(treatment.image.path, manifestEntry.imagePath);
    assert.equal(treatment.image.alt, manifestEntry.altText);
    assert.match(treatment.image.alt, /[A-Za-zÁÉÍÓÚáéíóú]/);
    assert.ok(treatment.image.alt.length >= 40);
    await assert.doesNotReject(stat(`public${treatment.image.path}`));
  }
});

test("the ledger and roll are generated from the catalog with lazy images", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  const generator = await readFile("scripts/generate.mjs", "utf8");
  assert.match(generator, /treatments\.map\(renderLedgerRow\)/);
  assert.match(generator, /loading="lazy" decoding="async"/);
  assert.match(generator, /data-goals=/);
  assert.match(source, /<!-- TREATMENT_LEDGER -->/);
  assert.match(source, /<!-- ROLL_ITEMS -->/);
  assert.match(source, /aria-roledescription="carrusel"/);
});

test("the linen roll and folds are motion-only enhancements with reduced-motion protection", async () => {
  const sections = await readFile("src/styles/sections.css", "utf8");
  const motion = await readFile("src/scripts/motion.js", "utf8");
  const scroll = await readFile("src/scripts/scroll.js", "utf8");
  assert.match(sections, /\.roll--3d \.roll__item \{[^}]*backface-visibility: hidden/s);
  assert.match(motion, /prefers-reduced-motion: no-preference/);
  assert.match(motion, /gsap\.matchMedia\(\)/);
  assert.match(scroll, /new Lenis\(\{ lerp: 0\.1 \}\)/);
  assert.match(scroll, /if \(prefersReducedMotion\(\)\) return null/);
});

test("the document loads its visual system without JavaScript", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  const mainScript = await readFile("src/scripts/main.js", "utf8");
  const mainStyles = await readFile("src/styles/main.css", "utf8");
  assert.match(source, /<link rel="stylesheet" href="\/src\/styles\/main\.css" \/>/);
  assert.doesNotMatch(mainScript, /\.css["']/);
  assert.match(mainStyles, /@fontsource\/cormorant-garamond/);
  assert.match(mainStyles, /@fontsource\/manrope/);
  assert.match(mainStyles, /lenis\/dist\/lenis\.css/);
});
