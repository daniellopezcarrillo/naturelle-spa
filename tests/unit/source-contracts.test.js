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

test("the trust strip contains exactly three documented facts", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  const strip = source.match(/<section class="trust-strip"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.equal((strip.match(/<p>/g) ?? []).length, 3);
  assert.doesNotMatch(strip, /Consulta directa/);
});

test("focus, field borders, and header transitions preserve the quality contract", async () => {
  const base = await readFile("src/styles/base.css", "utf8");
  const sections = await readFile("src/styles/sections.css", "utf8");
  assert.match(base, /outline:\s*3px solid #f7f5ef/);
  assert.match(base, /box-shadow:\s*0 0 0 6px #1c2018/);
  assert.match(sections, /border:\s*1px solid #dfe2d2/);
  assert.doesNotMatch(sections, /transition:\s*height/);
});

test("official brand and gallery assets preserve accessible descriptions", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  assert.equal((source.match(/naturelle-spa-logo-official\.png/g) ?? []).length, 2);
  assert.equal((source.match(/naturelle-spa-mark\.png/g) ?? []).length, 2);
  assert.equal((source.match(/<strong>Imagen ilustrativa<\/strong>/g) ?? []).length, 0);
  assert.match(source, /facial-juventud-radiante-illustrative\.avif/);
  assert.doesNotMatch(source, /facial-feature__caption">Imagen ilustrativa/);
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

test("the catalog is image-led and retains no-JS treatment content", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  const generator = await readFile("scripts/generate.mjs", "utf8");
  assert.match(generator, /treatments\.map\(renderTreatment\)/);
  assert.match(generator, /loading=\\?"lazy\\?" decoding=\\?"async\\?"/);
  assert.match(source, /<!-- BODY_TREATMENTS -->/);
  assert.doesNotMatch(source, /treatment-entry/);
});

test("treatment media stays compact and ratio-controlled across layouts", async () => {
  const sections = await readFile("src/styles/sections.css", "utf8");
  assert.match(sections, /\.treatment-story__media \{[^}]*width: min\(100%, clamp\(17\.5rem, 28vw, 21rem\)\)/s);
  assert.match(sections, /\.treatment-story__media picture \{[^}]*aspect-ratio: 4 \/ 5/s);
  assert.match(sections, /\.treatment-story__media img \{[^}]*height: 100%/s);
  assert.match(sections, /\.treatment-story__media, \.treatment-story:nth-child\(even\) \.treatment-story__media \{[^}]*width: min\(100%, clamp\(15rem, 76vw, 18\.75rem\)\)/s);
});

test("treatment media uses deterministic organic shapes with reduced-motion protection", async () => {
  const generator = await readFile("scripts/generate.mjs", "utf8");
  const sections = await readFile("src/styles/sections.css", "utf8");
  assert.match(generator, /\["lens", "arch", "botanical"\]/);
  assert.match(generator, /data-media-shape=/);
  assert.match(sections, /data-media-shape="arch"/);
  assert.match(sections, /data-media-shape="botanical"/);
  assert.match(sections, /prefers-reduced-motion: reduce/);
  assert.match(sections, /\.treatment-story__media picture,[\s\S]*?transition: none;[\s\S]*?transform: none;/);
});

test("the document loads its visual system without JavaScript", async () => {
  const source = await readFile("src/index.template.html", "utf8");
  const mainScript = await readFile("src/scripts/main.js", "utf8");
  const mainStyles = await readFile("src/styles/main.css", "utf8");
  assert.match(source, /<link rel="stylesheet" href="\/src\/styles\/main\.css" \/>/);
  assert.doesNotMatch(mainScript, /\.css["']/);
  assert.match(mainStyles, /@fontsource\/cormorant-garamond/);
  assert.match(mainStyles, /@fontsource\/manrope/);
});
