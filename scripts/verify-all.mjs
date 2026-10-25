/**
 * Boots the production server and runs every runtime suite against it:
 * routes/metadata, the chatbot cases, and the adversarial scope cases.
 * Writes a combined report to verify-summary.txt.
 *
 * Usage: node scripts/verify-all.mjs [port]
 */
import { spawn, spawnSync } from "node:child_process";
import { writeFileSync, appendFileSync, existsSync } from "node:fs";

const PORT = process.argv[2] || process.env.PORT || "3400";
const BASE = `http://localhost:${PORT}`;
const OUT = "verify-summary.txt";

function log(m) {
  // Console first so the user sees progress even if the run is interrupted.
  console.log(m);
  try {
    appendFileSync(OUT, `${m}\n`, "utf8");
  } catch {
    /* ignore */
  }
}

/**
 * `next start` only serves a production build. If the last thing that ran was
 * `next dev`, .next holds a dev build and `next start` exits instantly — which
 * previously looked like a 90-second hang because the child's output was
 * discarded.
 */
function assertProductionBuild() {
  if (!existsSync(".next")) {
    log("No .next directory found.");
    return false;
  }
  if (!existsSync(".next/BUILD_ID")) {
    log(".next exists but has no BUILD_ID — it looks like a dev build.");
    return false;
  }
  return true;
}

function waitForServer(timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return (async () => {
    while (Date.now() < deadline) {
      try {
        const res = await fetch(BASE, { method: "HEAD" });
        if (res.status > 0) return true;
      } catch {
        /* not up yet */
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    return false;
  })();
}

function runSuite(label, args) {
  log(`\n################ ${label} ################`);
  const res = spawnSync(process.execPath, args, {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  const out = `${res.stdout || ""}${res.stderr || ""}`;
  const lines = out.split(/\r?\n/).filter((l) => {
    const t = l.trim();
    return /^===/.test(t) || /PASSED|FAILED|LEAK|BLOCK|FAIL|Results:/.test(t) || /^\[/.test(t);
  });
  log(lines.join("\n").trim() || out.slice(-1500));
  log(`exit=${res.status}`);
  return res.status ?? 1;
}

async function main() {
  writeFileSync(OUT, `Verification ${new Date().toISOString()}\nTarget ${BASE}\n`, "utf8");

  if (!assertProductionBuild()) {
    log(
      [
        "",
        "This suite runs against a PRODUCTION build. Build first:",
        "",
        "    npm run check          # build + verify, in the right order",
        "",
        "Note: `npm run dev` overwrites .next with a dev build, which",
        "`next start` cannot serve.",
      ].join("\n")
    );
    return 1;
  }

  log(`Starting production server on port ${PORT}…`);

  // Capture the child's output rather than discarding it, so a boot failure is
  // reported immediately instead of surfacing as a timeout.
  const server = spawn(
    process.execPath,
    ["./node_modules/next/dist/bin/next", "start", "-p", PORT],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  let serverLog = "";
  server.stdout.on("data", (d) => (serverLog += d.toString()));
  server.stderr.on("data", (d) => (serverLog += d.toString()));

  let exitedEarly = false;
  server.on("exit", (code) => {
    if (code !== null && code !== 0) exitedEarly = true;
  });

  try {
    const ready = await waitForServer(90000);

    if (!ready) {
      log("\nERROR: the production server did not become ready.");
      if (serverLog.trim()) {
        log("\n--- server output ---");
        log(serverLog.trim().slice(0, 2000));
      } else if (exitedEarly) {
        log("The server process exited immediately without output.");
      }
      log(
        `\nIf the port is busy, pass another: npm run verify:all -- 3700\nOr check nothing else is on ${PORT}: npm run ports`
      );
      return 1;
    }

    log("Server ready.");

    const results = [
      ["routes", runSuite("ROUTES / METADATA / API", ["scripts/verify-routes.mjs", BASE])],
      [
        "chatbot",
        runSuite("CHATBOT CASES", [
          "./node_modules/tsx/dist/cli.mjs",
          "scripts/test-chatbot.ts",
          BASE,
        ]),
      ],
      ["scope", runSuite("SCOPE CASES", ["scripts/test-scope.mjs", BASE])],
    ];

    const failed = results.filter(([, status]) => status !== 0);
    log(`\n=== OVERALL: ${failed.length === 0 ? "ALL SUITES PASSED" : "FAILURES"} ===`);
    for (const [name, status] of results) {
      log(`  ${name}: ${status === 0 ? "pass" : "FAIL"}`);
    }
    log(`\nFull report written to ${OUT}`);
    return failed.length ? 1 : 0;
  } finally {
    server.kill();
  }
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    log(`\nFATAL: ${err?.stack || err}`);
    process.exit(1);
  });
