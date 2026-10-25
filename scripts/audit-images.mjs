/**
 * Reports the pixel dimensions and weight of every asset in public/assets so
 * oversized sources can be spotted. Writes image-audit.txt.
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIR = "public/assets";
const rows = [];

for (const file of readdirSync(DIR)) {
  if (!/\.(webp|png|jpe?g|avif)$/i.test(file)) continue;
  const full = path.join(DIR, file);
  const kb = Math.round(statSync(full).size / 1024);
  try {
    const { width, height } = await sharp(full).metadata();
    rows.push({ file, width, height, kb });
  } catch (err) {
    rows.push({ file, width: 0, height: 0, kb, err: err.message });
  }
}

rows.sort((a, b) => b.kb - a.kb);

const lines = [
  `Image audit ${new Date().toISOString()}`,
  `${rows.length} files, ${rows.reduce((s, r) => s + r.kb, 0)} KB total`,
  "",
  "KB".padStart(5) + "  " + "DIMENSIONS".padEnd(14) + "FILE",
];
for (const r of rows) {
  lines.push(
    `${String(r.kb).padStart(5)}  ${`${r.width}x${r.height}`.padEnd(14)}${r.file}${
      r.err ? `  ERR ${r.err}` : ""
    }`
  );
}

const out = lines.join("\n") + "\n";
writeFileSync("image-audit.txt", out, "utf8");
console.log(out);
