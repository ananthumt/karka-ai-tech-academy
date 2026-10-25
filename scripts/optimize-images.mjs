/**
 * Recompresses oversized assets in public/assets.
 *
 * Rationale: several assets are far larger than anything the UI renders.
 * The avatars are 400x600 at up to 60 KB but display at 48px; a few course /
 * campus shots are badly compressed (genai-mastery is 211 KB for 800x1000).
 * `next/image` + sharp resizes on request, so source weight mostly costs
 * repo size and first-optimization time — but these are big enough to matter.
 *
 * Originals are copied to public/assets/.original/ before anything is
 * overwritten, so this is reversible.
 *
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import {
  readdirSync,
  statSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  writeFileSync,
  readFileSync,
} from "node:fs";
import path from "node:path";

const DIR = "public/assets";
const BACKUP = path.join(DIR, ".original");
mkdirSync(BACKUP, { recursive: true });

/**
 * Max rendered width per asset family, with headroom for 2x displays.
 * Anything wider than this is pure waste.
 */
const RULES = [
  // Avatars render at 36-112px. 320px covers 2x on the largest usage.
  { match: /-avatar\.webp$/, maxWidth: 320, quality: 78 },
  { match: /^owner\.webp$/, maxWidth: 640, quality: 80 },
  // Partner logos render ~112px wide.
  {
    match: /^(amazon|tcs|hcl|matrimony|novac|capecom|flow|sodisys)\.webp$/,
    maxWidth: 320,
    quality: 82,
  },
  { match: /^logo\.webp$/, maxWidth: 480, quality: 85 },
  // Hero / wide campus imagery: 1600 covers 2x of its ~800px slot.
  { match: /^(hero-realistic-studio|student-collage|school|professional)\.webp$/, maxWidth: 1280, quality: 74 },
  // Course + blog + project cards render at most ~560px wide.
  { match: /\.webp$/, maxWidth: 1000, quality: 76 },
];

function ruleFor(file) {
  return RULES.find((r) => r.match.test(file));
}

const report = [`Image optimization ${new Date().toISOString()}`, ""];
let beforeTotal = 0;
let afterTotal = 0;
let changed = 0;

for (const file of readdirSync(DIR)) {
  const full = path.join(DIR, file);
  if (!statSync(full).isFile()) continue;
  if (!/\.webp$/i.test(file)) continue;

  const rule = ruleFor(file);
  if (!rule) continue;

  const beforeKb = Math.round(statSync(full).size / 1024);
  beforeTotal += beforeKb;

  try {
    // Read into a Buffer rather than handing sharp the path. On Windows sharp
    // keeps the source file open, so writing the result back to the same path
    // fails with EBUSY/EPERM.
    const input = readFileSync(full);

    const meta = await sharp(input).metadata();
    const targetWidth = Math.min(meta.width ?? rule.maxWidth, rule.maxWidth);

    const buf = await sharp(input)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: rule.quality, effort: 6 })
      .toBuffer();

    const afterKb = Math.round(buf.length / 1024);

    // Only rewrite when it is a real improvement; never make a file bigger.
    if (afterKb < beforeKb) {
      if (!existsSync(path.join(BACKUP, file))) {
        copyFileSync(full, path.join(BACKUP, file));
      }
      writeFileSync(full, buf);
      afterTotal += afterKb;
      changed++;
      report.push(
        `${file.padEnd(34)} ${String(beforeKb).padStart(4)} KB -> ${String(
          afterKb
        ).padStart(4)} KB   ${meta.width}x${meta.height} -> ${targetWidth}w`
      );
    } else {
      afterTotal += beforeKb;
    }
  } catch (err) {
    afterTotal += beforeKb;
    report.push(`${file.padEnd(34)} SKIPPED: ${err.message}`);
  }
}

report.push(
  "",
  `${changed} files rewritten`,
  `total ${beforeTotal} KB -> ${afterTotal} KB (saved ${beforeTotal - afterTotal} KB)`,
  `originals backed up in ${BACKUP}`
);

const out = report.join("\n") + "\n";
writeFileSync("image-optimize.txt", out, "utf8");
console.log(out);
