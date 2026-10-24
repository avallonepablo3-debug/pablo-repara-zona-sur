import { readdir, mkdir, access, copyFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const inputDir = new URL("../src/assets/", root);
const outputDir = new URL("../src/assets/optimized/", root);

const sizes = {
  hero: [640, 1280],
  default: [480, 960],
};

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function isFileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const files = await readdir(inputDir, { withFileTypes: true });
await ensureDir(outputDir);

for (const file of files) {
  if (!file.isFile()) continue;

  const filePath = new URL(file.name, inputDir);
  const extension = extname(file.name).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(extension)) continue;

  const baseName = basename(file.name, extension);
  const targetSizes = baseName.startsWith("hero") ? sizes.hero : sizes.default;

  for (const size of targetSizes) {
    const outputName = `${baseName}-${size}.webp`;
    const outputPath = new URL(outputName, outputDir);

    if (await isFileExists(outputPath)) continue;

    await sharp(filePath)
      .resize({ width: size, fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(outputPath);
  }
}

const sourceFiles = [
  ["hero.jpg", "hero-1280.webp"],
  ["hero.jpg", "hero-640.webp"],
  ["ba-lavarropas.jpg", "ba-lavarropas-960.webp"],
  ["ba-lavarropas.jpg", "ba-lavarropas-480.webp"],
  ["ba-heladera.jpg", "ba-heladera-960.webp"],
  ["ba-heladera.jpg", "ba-heladera-480.webp"],
];

for (const [sourceName, targetName] of sourceFiles) {
  const sourcePath = new URL(`../src/assets/${sourceName}`, import.meta.url);
  const targetPath = new URL(`../src/assets/${targetName}`, import.meta.url);
  if (await isFileExists(sourcePath) && !(await isFileExists(targetPath))) {
    await copyFile(sourcePath, targetPath);
  }
}

console.log("Image optimization complete.");
