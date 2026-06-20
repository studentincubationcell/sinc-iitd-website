import fs from "fs";
import sharp from "sharp";

const input = fs.existsSync("sinclogopng.png") ? "sinclogopng.png" : "public/logo.png";
const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const counts = {};

for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = info.channels === 4 ? data[i + 3] : 255;
  if (a < 128) continue;
  if (r + g + b < 40 || r + g + b > 720) continue;
  const key = [Math.round(r / 16) * 16, Math.round(g / 16) * 16, Math.round(b / 16) * 16];
  const hex = `#${key.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  counts[hex] = (counts[hex] || 0) + 1;
}

console.log(
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([hex, count]) => `${hex} (${count})`)
    .join("\n")
);
