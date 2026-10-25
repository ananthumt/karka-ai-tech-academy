/**
 * Runs typecheck + production build and writes a summary to
 * build-summary.txt. Spawns the local binaries directly (not via npm) so it
 * works regardless of shell quirks on Windows.
 */
import { spawnSync } from "node:child_process";
import { writeFileSync, appendFileSync, rmSync } from "node:fs";

const OUT = "build-summary.txt";
writeFileSync(OUT, `Started ${new Date().toISOString()}\n`, "utf8");

// Always build from a clean .next. A partially-written build directory (for
// example from an interrupted or concurrent `next build`) surfaces as a
// confusing `ENOENT: ... _ssgManifest.js` at the very end of an otherwise
// successful compile.
rmSync(".next", { recursive: true, force: true });

function log(msg) {
  appendFileSync(OUT, `${msg}\n`, "utf8");
  console.log(msg);
}

function run(label, args) {
  log(`\n--- ${label} ---`);
  const res = spawnSync(process.execPath, args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });

  if (res.error) {
    log(`SPAWN ERROR: ${res.error.message}`);
    return { status: 1, output: "" };
  }

  const output = `${res.stdout || ""}\n${res.stderr || ""}`;
  const lines = output
    .split(/\r?\n/)
    .map((l) => l.replace(/\r/g, "").trimEnd())
    .filter((l) => l.trim().length > 0);

  const keep = lines.filter(
    (l) =>
      /^[┌├└]/.test(l) ||
      /First Load/.test(l) ||
      /^(○|●|ƒ)\s/.test(l) ||
      /chunks\//.test(l) ||
      /error|Error|failed|Failed|⚠/.test(l) ||
      /Compiled successfully/.test(l) ||
      /validity of types/.test(l) ||
      /Generating static pages \(\d+\/\d+\)\s*$/.test(l) ||
      /\[KB Builder\]|\[brand-assets\]/.test(l)
  );

  log(keep.length ? keep.join("\n") : "(no notable output)");
  log(`exit=${res.status}`);
  return { status: res.status ?? 1, output };
}

const kb = run("build:kb", ["./node_modules/tsx/dist/cli.mjs", "scripts/build-kb.ts"]);
const assets = run("build:assets", ["scripts/generate-brand-assets.mjs"]);
const tsc = run("typecheck", ["./node_modules/typescript/bin/tsc", "--noEmit"]);
const build = run("next build", ["./node_modules/next/dist/bin/next", "build"]);

const failed = [kb, assets, tsc, build].some((r) => r.status !== 0);
log(`\n=== OVERALL: ${failed ? "FAILED" : "PASSED"} ===`);
process.exit(failed ? 1 : 0);
