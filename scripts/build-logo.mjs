import fs from "fs";
import sharp from "sharp";

const input = "sinclogopng.png";
const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r + g + b < 45) data[i + 3] = 0;
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile("public/logo.png");

const pngBuf = fs.readFileSync("public/logo.png");
const b64 = pngBuf.toString("base64");
const svg = [
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"',
  ' width="400" height="400" viewBox="0 0 400 400" fill="none">',
  `<image width="400" height="400" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${b64}"/>`,
  "</svg>",
].join("");
fs.writeFileSync("public/logo.svg", svg);

console.log(`Built public/logo.png and public/logo.svg (${info.width}x${info.height})`);
