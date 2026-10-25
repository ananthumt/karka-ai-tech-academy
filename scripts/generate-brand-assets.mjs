/**
 * Generates the static brand assets consumed by the App Router file
 * conventions: app/opengraph-image.png and app/apple-icon.png.
 *
 * Why this exists instead of `next/og` ImageResponse:
 * the bundled @vercel/og throws `TypeError: Invalid URL` during
 * `next build` on Windows (vercel/next.js#77164), which fails the whole
 * export. Pre-rendering these two rasters here keeps the build green on every
 * platform and removes three serverless routes from the deployment.
 *
 * Zero dependencies: PNG is encoded by hand using Node's built-in zlib, and
 * text is drawn from a compact 5x7 bitmap font defined below.
 *
 * Run with: npm run build:assets
 */

import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

/* -------------------------------------------------------------------------- */
/* PNG encoder                                                                */
/* -------------------------------------------------------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

/** Encode an RGBA pixel buffer (width*height*4) as a PNG. */
function encodePng(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // adaptive filtering
  ihdr[12] = 0; // no interlace

  // One filter byte (0 = None) per scanline.
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* -------------------------------------------------------------------------- */
/* Canvas helpers                                                             */
/* -------------------------------------------------------------------------- */

function createCanvas(width, height) {
  return { width, height, data: Buffer.alloc(width * height * 4) };
}

function setPixel(canvas, x, y, [r, g, b], alpha = 1) {
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height || alpha <= 0) return;
  const i = (y * canvas.width + x) * 4;
  const a = Math.min(1, alpha);
  // Source-over against the existing (opaque) backdrop.
  canvas.data[i] = Math.round(canvas.data[i] * (1 - a) + r * a);
  canvas.data[i + 1] = Math.round(canvas.data[i + 1] * (1 - a) + g * a);
  canvas.data[i + 2] = Math.round(canvas.data[i + 2] * (1 - a) + b * a);
  canvas.data[i + 3] = 255;
}

function fillRect(canvas, x0, y0, w, h, colour, alpha = 1) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) setPixel(canvas, x, y, colour, alpha);
  }
}

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => [
  Math.round(lerp(c1[0], c2[0], t)),
  Math.round(lerp(c1[1], c2[1], t)),
  Math.round(lerp(c1[2], c2[2], t)),
];

/** Three-stop diagonal brand gradient: indigo → violet → cyan. */
function paintBrandGradient(canvas) {
  const stops = [
    [79, 70, 229],
    [124, 58, 237],
    [34, 211, 238],
  ];
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const t = (x / canvas.width) * 0.6 + (y / canvas.height) * 0.4;
      const colour =
        t < 0.5 ? mix(stops[0], stops[1], t / 0.5) : mix(stops[1], stops[2], (t - 0.5) / 0.5);
      setPixel(canvas, x, y, colour);
    }
  }
}

/** Dark canvas with two soft radial brand glows, matching the site hero. */
function paintDarkBackdrop(canvas) {
  const base = [11, 17, 32];
  const glowA = { x: 0.16, y: 0.0, r: 0.78, colour: [79, 70, 229], strength: 0.55 };
  const glowB = { x: 0.95, y: 1.0, r: 0.62, colour: [34, 211, 238], strength: 0.3 };

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let colour = base;
      for (const g of [glowA, glowB]) {
        const dx = (x / canvas.width - g.x) * 1.0;
        const dy = (y / canvas.height - g.y) * 0.72;
        const d = Math.sqrt(dx * dx + dy * dy) / g.r;
        if (d < 1) {
          const falloff = Math.pow(1 - d, 2.1) * g.strength;
          colour = mix(colour, g.colour, falloff);
        }
      }
      setPixel(canvas, x, y, colour);
    }
  }
}

/** Rounded-corner mask: clears pixels outside the radius to transparent. */
function roundCorners(canvas, radius) {
  const { width: w, height: h } = canvas;
  const corners = [
    [radius, radius, 0, 0],
    [w - radius - 1, radius, w - 1, 0],
    [radius, h - radius - 1, 0, h - 1],
    [w - radius - 1, h - radius - 1, w - 1, h - 1],
  ];
  for (const [cx, cy, qx, qy] of corners) {
    const x0 = Math.min(cx, qx);
    const x1 = Math.max(cx, qx);
    const y0 = Math.min(cy, qy);
    const y1 = Math.max(cy, qy);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const d = Math.hypot(x - cx, y - cy);
        if (d > radius) {
          const i = (y * w + x) * 4;
          canvas.data[i + 3] = 0;
        } else if (d > radius - 1) {
          const i = (y * w + x) * 4;
          canvas.data[i + 3] = Math.round(255 * (radius - d));
        }
      }
    }
  }
}

/* -------------------------------------------------------------------------- */
/* 5x7 bitmap font                                                            */
/* Each glyph is 7 rows of 5 bits, MSB-first (bit 4 = leftmost column).       */
/* -------------------------------------------------------------------------- */

const FONT = {
  A: [0x0e, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  B: [0x1e, 0x11, 0x11, 0x1e, 0x11, 0x11, 0x1e],
  C: [0x0e, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0e],
  D: [0x1e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x1e],
  E: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x1f],
  F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
  G: [0x0e, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0e],
  H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  I: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x1f],
  J: [0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0c],
  K: [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
  L: [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f],
  M: [0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11],
  N: [0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11],
  O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  P: [0x1e, 0x11, 0x11, 0x1e, 0x10, 0x10, 0x10],
  Q: [0x0e, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0d],
  R: [0x1e, 0x11, 0x11, 0x1e, 0x14, 0x12, 0x11],
  S: [0x0f, 0x10, 0x10, 0x0e, 0x01, 0x01, 0x1e],
  T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  U: [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  V: [0x11, 0x11, 0x11, 0x11, 0x11, 0x0a, 0x04],
  W: [0x11, 0x11, 0x11, 0x15, 0x15, 0x1b, 0x11],
  X: [0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11],
  Y: [0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04],
  Z: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1f],
  0: [0x0e, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0e],
  1: [0x04, 0x0c, 0x04, 0x04, 0x04, 0x04, 0x0e],
  2: [0x0e, 0x11, 0x01, 0x02, 0x04, 0x08, 0x1f],
  3: [0x1f, 0x02, 0x04, 0x02, 0x01, 0x11, 0x0e],
  4: [0x02, 0x06, 0x0a, 0x12, 0x1f, 0x02, 0x02],
  5: [0x1f, 0x10, 0x1e, 0x01, 0x01, 0x11, 0x0e],
  6: [0x06, 0x08, 0x10, 0x1e, 0x11, 0x11, 0x0e],
  7: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08],
  8: [0x0e, 0x11, 0x11, 0x0e, 0x11, 0x11, 0x0e],
  9: [0x0e, 0x11, 0x11, 0x0f, 0x01, 0x02, 0x0c],
  " ": [0, 0, 0, 0, 0, 0, 0],
  "-": [0x00, 0x00, 0x00, 0x1f, 0x00, 0x00, 0x00],
  ".": [0x00, 0x00, 0x00, 0x00, 0x00, 0x0c, 0x0c],
  ",": [0x00, 0x00, 0x00, 0x00, 0x0c, 0x04, 0x08],
  "+": [0x00, 0x04, 0x04, 0x1f, 0x04, 0x04, 0x00],
  "&": [0x0c, 0x12, 0x14, 0x08, 0x15, 0x12, 0x0d],
  "/": [0x01, 0x02, 0x02, 0x04, 0x08, 0x08, 0x10],
  "'": [0x04, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00],
  ":": [0x00, 0x0c, 0x0c, 0x00, 0x0c, 0x0c, 0x00],
};

/**
 * Draw uppercase text. `scale` is the pixel size of one font cell, and
 * `weight` thickens strokes horizontally for a bolder display look.
 */
function drawText(canvas, text, x, y, scale, colour, { weight = 1, tracking = 1 } = {}) {
  let cursor = x;
  for (const rawChar of text.toUpperCase()) {
    const glyph = FONT[rawChar] ?? FONT[" "];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if ((glyph[row] >> (4 - col)) & 1) {
          fillRect(
            canvas,
            cursor + col * scale,
            y + row * scale,
            scale * weight,
            scale,
            colour
          );
        }
      }
    }
    cursor += (5 + tracking) * scale;
  }
  return cursor;
}

const textWidth = (text, scale, tracking = 1) => text.length * (5 + tracking) * scale;

/* -------------------------------------------------------------------------- */
/* Asset: Open Graph share card (1200x630)                                    */
/* -------------------------------------------------------------------------- */

const WHITE = [255, 255, 255];
const INDIGO_LIGHT = [165, 180, 252];
const SLATE = [148, 163, 184];
const SLATE_BRIGHT = [203, 213, 225];

function buildOpenGraphCard() {
  const canvas = createCanvas(1200, 630);
  paintDarkBackdrop(canvas);

  // Monogram tile, mirroring the favicon.
  const tile = createCanvas(84, 84);
  paintBrandGradient(tile);
  roundCorners(tile, 22);
  drawText(tile, "K", 25, 21, 7, WHITE, { weight: 2, tracking: 0 });
  compose(canvas, tile, 72, 64);

  // Wordmark. Bold runs need tracking 2, otherwise the thickened stroke of one
  // glyph bleeds into the next cell and the word reads as a smear.
  drawText(canvas, "KARKA", 176, 68, 5, WHITE, { weight: 2, tracking: 2 });
  drawText(canvas, "AI & TECH ACADEMY", 176, 112, 3, INDIGO_LIGHT, { tracking: 1 });

  // Headline
  drawText(canvas, "BECOME AN", 72, 232, 7, WHITE, { weight: 2, tracking: 2 });
  drawText(canvas, "INDUSTRY-READY", 72, 302, 7, WHITE, { weight: 2, tracking: 2 });
  drawText(canvas, "SOFTWARE DEVELOPER", 72, 372, 6, INDIGO_LIGHT, {
    weight: 2,
    tracking: 2,
  });

  // Accent rule
  fillRect(canvas, 72, 436, 180, 6, [129, 140, 248]);

  // Value proposition
  drawText(canvas, "ZERO UPFRONT TUITION - PAY ONLY AFTER PLACEMENT", 72, 470, 3, SLATE_BRIGHT, {
    tracking: 1,
  });

  // Proof row
  const stats = [
    ["800+", "LEARNERS TRAINED"],
    ["650+", "PLACED IN TECH"],
    ["50+", "HIRING PARTNERS"],
    ["24 LPA", "HIGHEST PACKAGE"],
  ];
  let sx = 72;
  for (const [value, label] of stats) {
    drawText(canvas, value, sx, 526, 4, [129, 140, 248], { weight: 2, tracking: 2 });
    drawText(canvas, label, sx, 572, 2, SLATE, { tracking: 1 });
    sx += Math.max(textWidth(value, 4, 2), textWidth(label, 2, 1)) + 44;
  }

  // Location, right-aligned on the wordmark row.
  const place = "NAGERCOIL, TAMIL NADU";
  drawText(canvas, place, 1200 - 72 - textWidth(place, 3), 112, 3, SLATE, { tracking: 1 });

  return canvas;
}

/** Alpha-composite `src` onto `dst` at (ox, oy). */
function compose(dst, src, ox, oy) {
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const si = (y * src.width + x) * 4;
      const a = src.data[si + 3] / 255;
      if (a <= 0) continue;
      setPixel(
        dst,
        ox + x,
        oy + y,
        [src.data[si], src.data[si + 1], src.data[si + 2]],
        a
      );
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Asset: Apple touch icon (180x180)                                          */
/* -------------------------------------------------------------------------- */

function buildAppleIcon() {
  // Apple adds its own mask, so this stays a full-bleed square.
  const canvas = createCanvas(180, 180);
  paintBrandGradient(canvas);
  drawText(canvas, "K", 56, 52, 14, WHITE, { weight: 2, tracking: 0 });
  return canvas;
}

/* -------------------------------------------------------------------------- */
/* Write                                                                      */
/* -------------------------------------------------------------------------- */

const appDir = path.resolve(process.cwd(), "app");
mkdirSync(appDir, { recursive: true });

const targets = [
  ["opengraph-image.png", buildOpenGraphCard()],
  ["twitter-image.png", buildOpenGraphCard()],
  ["apple-icon.png", buildAppleIcon()],
];

for (const [name, canvas] of targets) {
  const png = encodePng(canvas.width, canvas.height, canvas.data);
  const dest = path.join(appDir, name);
  writeFileSync(dest, png);
  console.log(
    `[brand-assets] ${name} — ${canvas.width}x${canvas.height}, ${(png.length / 1024).toFixed(1)} KB`
  );
}
