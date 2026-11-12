import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Generate bounded-size images once at deployment; never decode large PNGs per request.
const root = fileURLToPath(new URL('.', import.meta.url));
await mkdir(join(root, 'optimized/images'), { recursive: true });
let before = 0, after = 0;
for (const name of await readdir(join(root, 'images'))) {
  if (!name.endsWith('.png')) continue;
  const input = join(root, 'images', name);
  const output = join(root, 'optimized/images', name.replace(/\.png$/, '.webp'));
  const source = await stat(input);
  before += source.size;
  const existing = await stat(output).catch(() => null);
  if (!existing || existing.mtimeMs < source.mtimeMs) {
    await sharp(input).rotate().resize({ width: 1280, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 64, effort: 4 }).toFile(output);
  }
  after += (await stat(output)).size;
}
console.log(`HorseCup backgrounds: ${before} -> ${after} bytes`);

