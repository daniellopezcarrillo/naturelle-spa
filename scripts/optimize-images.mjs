import sharp from "sharp";
import { access, stat } from "node:fs/promises";
import { treatments } from "../src/data/treatments.js";

const galleryImages = [
  "public/images/generated/gallery/body/body-aesthetic-massage-illustrative.png",
  "public/images/generated/gallery/body/body-maderotherapy-still-life.png",
  "public/images/generated/gallery/facial/facial-cooling-care.png",
  "public/images/generated/gallery/facial/facial-radiofrequency.png",
  "public/images/generated/gallery/facial/facial-juventud-radiante-illustrative.png",
  ...treatments.map(({ image }) => `public${image.path}`),
];

for (const source of galleryImages) {
  await access(source);
  const base = source.replace(/\.png$/i, "");
  const [avifExists, webpExists] = await Promise.all([
    stat(`${base}.avif`).then(() => true).catch(() => false),
    stat(`${base}.webp`).then(() => true).catch(() => false),
  ]);
  if (avifExists && webpExists) continue;
  const image = sharp(source).resize({ width: 1280, withoutEnlargement: true });
  await Promise.all([
    avifExists ? Promise.resolve() : image.clone().avif({ quality: 58, effort: 5 }).toFile(`${base}.avif`),
    webpExists ? Promise.resolve() : image.clone().webp({ quality: 82, effort: 5 }).toFile(`${base}.webp`),
  ]);
}

console.log(`Optimized ${galleryImages.length} gallery images.`);
