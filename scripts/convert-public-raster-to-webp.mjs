import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const rasterRe = /\.(png|jpe?g|gif)$/i;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (rasterRe.test(ent.name)) out.push(full);
  }
  return out;
}

async function convert(file) {
  const outPath = file.replace(rasterRe, ".webp");
  const isGif = /\.gif$/i.test(file);
  const pipeline = isGif
    ? sharp(file, { animated: true, pages: -1 })
    : sharp(file);
  await pipeline.webp({ quality: 86, effort: 4 }).toFile(outPath);
  fs.unlinkSync(file);
  console.log(path.relative(publicDir, outPath));
}

const files = walk(publicDir);
for (const f of files) {
  await convert(f);
}
console.error(`Converted ${files.length} files to WebP under public/`);
