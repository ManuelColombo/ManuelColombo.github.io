#!/usr/bin/env node
// Usage: node scripts/optimize-image.js <image...> [--out <dir>] [--max-width 2400] [--quality 85]

const path = require('path');
const fs   = require('fs');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('sharp not found. Run: npm install --save-dev sharp');
  process.exit(1);
}

const args    = process.argv.slice(2);
const inputs  = [];
let outDir    = null;
let maxWidth  = 2400;
let quality   = 85;

for (let i = 0; i < args.length; i++) {
  if      (args[i] === '--out')       { outDir   = args[++i]; }
  else if (args[i] === '--max-width') { maxWidth = parseInt(args[++i]); }
  else if (args[i] === '--quality')   { quality  = parseInt(args[++i]); }
  else { inputs.push(args[i]); }
}

if (!inputs.length) {
  console.error('Usage: node scripts/optimize-image.js <image...> [--out <dir>] [--max-width 2400] [--quality 85]');
  process.exit(1);
}

const toKB = bytes => Math.round(bytes / 1024);

async function optimize(inputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`  ✗ not found: ${inputPath}`);
    return false;
  }

  const destDir = outDir ?? path.dirname(inputPath);
  fs.mkdirSync(destDir, { recursive: true });

  const ext      = path.extname(inputPath).toLowerCase();
  const base     = path.basename(inputPath, ext);
  const destPath = path.join(destDir, base + '.jpg');
  const tmpPath  = destPath + '.opt.tmp';

  const inputSize = fs.statSync(inputPath).size;
  const img       = sharp(inputPath);
  const meta      = await img.metadata();

  const needsResize = meta.width > maxWidth;
  const pipeline    = needsResize
    ? img.resize(maxWidth, null, { withoutEnlargement: true })
    : img;

  await pipeline.jpeg({ quality, progressive: true }).toFile(tmpPath);
  fs.renameSync(tmpPath, destPath);

  const outputSize = fs.statSync(destPath).size;
  const savedPct   = Math.round((1 - outputSize / inputSize) * 100);
  const sign       = savedPct >= 0 ? '-' : '+';

  console.log(
    `  ✓ ${path.basename(inputPath)} → ${path.basename(destPath)}` +
    `  ${toKB(inputSize)} KB → ${toKB(outputSize)} KB  (${sign}${Math.abs(savedPct)}%)`
  );
  if (needsResize) {
    console.log(`    ↳ resized: ${meta.width}px → ${maxWidth}px`);
  }
  return true;
}

(async () => {
  let ok = 0, fail = 0;
  for (const f of inputs) {
    if (await optimize(f)) ok++; else fail++;
  }
  console.log(`\n  ${ok} optimized${fail ? `, ${fail} failed` : ''}`);
  if (fail) process.exit(1);
})();
