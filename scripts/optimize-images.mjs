import { readdir, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import sharp from "sharp";

const inputDir = fileURLToPath(new URL("../src/assets/pablo/", import.meta.url));
const outputDir = fileURLToPath(new URL("../src/assets/", import.meta.url));

const images = [
  { source: "hero.jpg", name: "hero", widths: [640, 1280] },
  { source: "job1-antes.jpg", name: "job1-antes", widths: [480, 960] },
  { source: "job1-despues.jpg", name: "job1-despues", widths: [480, 960] },
  { source: "job2-antes.jpg", name: "job2-antes", widths: [480, 960] },
  { source: "job2-despues.jpg", name: "job2-despues", widths: [480, 960] },
];

let inputFiles;
try {
  inputFiles = await readdir(inputDir);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  inputFiles = [];
}

const availableImages = images.filter(({ source }) => {
  if (inputFiles.includes(source)) return true;
  console.warn(`No se encontró src/assets/pablo/${source}; se omite.`);
  return false;
});

if (availableImages.length > 0) {
  await mkdir(outputDir, { recursive: true });
}

for (const { source, name, widths } of availableImages) {
  for (const width of widths) {
    await sharp(join(inputDir, source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(outputDir, `${name}-${width}.webp`));
  }
}

console.log("Imágenes optimizadas en src/assets/.");
