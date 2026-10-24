import { readdir, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import sharp from "sharp";

const inputDir = fileURLToPath(new URL("../src/assets/pablo/", import.meta.url));
const outputDir = fileURLToPath(new URL("../src/assets/", import.meta.url));

const images = [
  { source: "hero.jpg", name: "hero", widths: [640, 1280] },
  { source: "profile.jpg", name: "profile", widths: [480, 960] },
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
  console.warn("No se encontró src/assets/pablo/. Agregá las seis fotos originales para optimizarlas.");
  process.exit(0);
}

const missingFiles = images
  .map(({ source }) => source)
  .filter((source) => !inputFiles.includes(source));

if (missingFiles.length > 0) {
  console.error(`Faltan fotos en src/assets/pablo/: ${missingFiles.join(", ")}`);
  process.exit(1);
}

await mkdir(outputDir, { recursive: true });

for (const { source, name, widths } of images) {
  for (const width of widths) {
    await sharp(join(inputDir, source))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(outputDir, `${name}-${width}.webp`));
  }
}

console.log("Imágenes optimizadas en src/assets/.");
