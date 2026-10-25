/**
 * Reports which local ports are currently serving the Karka site, and whether
 * each is healthy. Writes port-status.txt because terminal capture is
 * unreliable in this environment.
 *
 * Usage: node scripts/probe-ports.mjs [extraPort ...]
 */
import { writeFileSync } from "node:fs";

const DEFAULTS = [3000, 3001, 3100, 3200, 3210, 3300, 3400, 3500, 3600];
const extra = process.argv.slice(2).map(Number).filter(Boolean);
const PORTS = [...new Set([...DEFAULTS, ...extra])];

const lines = [`Probe ${new Date().toISOString()}`, ""];
const healthy = [];

for (const port of PORTS) {
  const url = `http://127.0.0.1:${port}/`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    const html = await res.text();
    const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "(no title)").slice(0, 64);
    // A healthy page is 200, mentions the brand, and renders the new hero.
    const hasHero = /industry-ready/i.test(html);
    const ok = res.status === 200 && /Karka/i.test(html);
    if (ok) healthy.push(port);
    lines.push(
      `${String(port).padEnd(6)} status=${res.status} ok=${ok} newHero=${hasHero} "${title}"`
    );
  } catch (err) {
    lines.push(`${String(port).padEnd(6)} down (${err.name})`);
  }
}

lines.push("", `HEALTHY: ${healthy.length ? healthy.join(", ") : "none"}`);

const out = lines.join("\n") + "\n";
writeFileSync("port-status.txt", out, "utf8");
console.log(out);
