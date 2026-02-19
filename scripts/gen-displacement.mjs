/**
 * Generates a 512x512 grayscale turbulence displacement map as PNG.
 * Uses fractal Perlin-like noise (value noise, 4 octaves).
 * Output: public/displacement.png
 *
 * Run: node scripts/gen-displacement.mjs
 * No external deps — pure Node.js with raw PNG encoding.
 */

import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import zlib from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/displacement.png");
const SIZE = 512;

// ── Value noise helpers ────────────────────────────────────────────────────
function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a, b, t) { return a + (b - a) * t; }

// Pseudo-random hash (deterministic)
function hash(x, y) {
  let n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

// 2D gradient noise
function noise2d(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fade(fx), uy = fade(fy);
  const a = hash(ix,     iy    );
  const b = hash(ix + 1, iy    );
  const c = hash(ix,     iy + 1);
  const d = hash(ix + 1, iy + 1);
  return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

// Fractal Brownian Motion (4 octaves)
function fbm(x, y) {
  let v = 0, amp = 0.5, freq = 1.0, max = 0;
  for (let i = 0; i < 6; i++) {
    v   += noise2d(x * freq, y * freq) * amp;
    max += amp;
    amp  *= 0.5;
    freq *= 2.1;
  }
  return v / max;
}

// ── Build pixel data ──────────────────────────────────────────────────────
// RGBA pixels — R and G channels carry displacement X/Y separately so the
// shader can use .r for X distortion and .g for Y distortion independently.
const pixels = new Uint8Array(SIZE * SIZE * 4);

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const nx = x / SIZE * 4.0;
    const ny = y / SIZE * 4.0;
    // Separate seeds for R and G so X/Y warp in different directions
    const r = fbm(nx,        ny       ) * 255;
    const g = fbm(nx + 17.3, ny + 5.7 ) * 255;
    const idx = (y * SIZE + x) * 4;
    pixels[idx + 0] = r | 0;
    pixels[idx + 1] = g | 0;
    pixels[idx + 2] = (r + g) / 2 | 0; // blue = avg
    pixels[idx + 3] = 255;
  }
}

// ── Encode as PNG (raw, no libraries) ────────────────────────────────────
// PNG spec: signature + IHDR + IDAT + IEND
function crc32(buf) {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  let crc = -1;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([typeBuf, data]);
  const crc  = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

// Build raw image data with filter byte (0 = None) per row
const rowSize = SIZE * 4;
const rawRows = Buffer.alloc(SIZE * (rowSize + 1));
for (let y = 0; y < SIZE; y++) {
  rawRows[y * (rowSize + 1)] = 0; // filter type = None
  const src = Buffer.from(pixels.buffer, pixels.byteOffset + y * rowSize, rowSize);
  src.copy(rawRows, y * (rowSize + 1) + 1);
}

const deflated = zlib.deflateSync(rawRows, { level: 6 });

const IHDR_data = Buffer.alloc(13);
IHDR_data.writeUInt32BE(SIZE, 0);
IHDR_data.writeUInt32BE(SIZE, 4);
IHDR_data[8] = 8;  // bit depth
IHDR_data[9] = 2;  // colour type: RGB (we write 4 bytes but PNG expects 3 for RGB)
// Switch to RGBA (colour type 6)
IHDR_data[9] = 6;
IHDR_data[10] = 0; // compression
IHDR_data[11] = 0; // filter
IHDR_data[12] = 0; // interlace

const PNG_SIG = Buffer.from([137,80,78,71,13,10,26,10]);

const png = Buffer.concat([
  PNG_SIG,
  chunk("IHDR", IHDR_data),
  chunk("IDAT", deflated),
  chunk("IEND", Buffer.alloc(0)),
]);

createWriteStream(OUT).end(png, () => {
  console.log(`✓ Displacement map written → ${OUT} (${(png.length / 1024).toFixed(1)} KB)`);
});
