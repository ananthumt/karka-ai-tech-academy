/**
 * Compiles app/globals.css through the project's PostCSS + Tailwind pipeline
 * and reports whether it parses and how large the output is.
 *
 * Useful for isolating "the page rendered with no styles at all", which can be
 * either a CSS parse failure (this script catches it) or a dev-server chunk
 * that had not finished compiling (this script will pass).
 */
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { readFileSync, writeFileSync } from "node:fs";

const css = readFileSync("app/globals.css", "utf8");
const lines = [`CSS check ${new Date().toISOString()}`, ""];

const open = (css.match(/\{/g) || []).length;
const close = (css.match(/\}/g) || []).length;
lines.push(`braces: ${open} open / ${close} close -> ${open === close ? "balanced" : "UNBALANCED"}`);
lines.push(`source: ${css.split("\n").length} lines, ${(css.length / 1024).toFixed(1)} KB`);

try {
  const result = await postcss([
    tailwindcss({ config: "./tailwind.config.ts" }),
    autoprefixer,
  ]).process(css, { from: "app/globals.css" });

  lines.push("");
  lines.push(`PARSE: OK`);
  lines.push(`output: ${(result.css.length / 1024).toFixed(1)} KB`);

  // Spot-check that key utilities actually made it into the output.
  const probes = [
    ".surface",
    ".surface-glass",
    ".ring-gradient",
    ".grain",
    ".mesh-dark",
    ".shine",
    ".elev-4",
    ".text-gradient-brand",
    ".no-scrollbar",
    ".tnum",
    "--scroll-progress",
  ];
  lines.push("");
  for (const p of probes) {
    lines.push(`  ${result.css.includes(p) ? "present" : "MISSING"}  ${p}`);
  }

  if (result.warnings().length) {
    lines.push("", "warnings:");
    for (const w of result.warnings()) lines.push(`  ${w.toString()}`);
  }
} catch (err) {
  lines.push("", "PARSE: FAILED");
  lines.push(String(err?.message || err));
  if (err?.line) lines.push(`at line ${err.line}, column ${err.column}`);
}

const out = lines.join("\n") + "\n";
writeFileSync("css-check.txt", out, "utf8");
console.log(out);
