/**
 * Guards against mixing dev and production output in .next.
 *
 * `next dev` and `next build` both write to .next but emit incompatible
 * webpack chunks. Switching modes without clearing it produces
 *   TypeError: __webpack_modules__[moduleId] is not a function
 * at request time, which is confusing because the build itself succeeded.
 *
 * Wired as `predev` so npm runs it automatically before `next dev`:
 *   - if .next holds a production build (it has BUILD_ID), remove it
 *   - otherwise leave the dev cache alone, so warm starts stay fast
 *
 * Usage: node scripts/ensure-clean-next.mjs [dev|prod]
 */
import { existsSync, rmSync } from "node:fs";

const arg = process.argv[2];
const mode = arg === "prod" ? "prod" : arg === "force" ? "force" : "dev";
const hasNext = existsSync(".next");
const hasProdBuild = existsSync(".next/BUILD_ID");

if (!hasNext) {
  process.exit(0);
}

/**
 * `force` clears .next unconditionally. Use it when the dev cache itself is
 * corrupt — the usual tell is Next looping on
 *   "missing required error components, refreshing..."
 * which happens after an interrupted compile. The mode-switch check below
 * can't detect that, because a corrupt dev cache still looks like a dev cache.
 */
if (mode === "force") {
  rmSync(".next", { recursive: true, force: true });
  console.log("[next-guard] Cleared .next (forced).");
  process.exit(0);
}

if (mode === "dev" && hasProdBuild) {
  rmSync(".next", { recursive: true, force: true });
  console.log(
    "[next-guard] Cleared .next — it held a production build, which `next dev` cannot reuse."
  );
  process.exit(0);
}

if (mode === "prod" && !hasProdBuild) {
  // Not fatal: `next build` will regenerate everything anyway. Clearing a dev
  // cache first avoids half-written dev chunks leaking into the output.
  rmSync(".next", { recursive: true, force: true });
  console.log("[next-guard] Cleared .next — it held a dev build.");
}
