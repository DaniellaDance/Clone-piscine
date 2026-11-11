import { readFile } from 'node:fs/promises';
import { createNeonClient } from '@neon/sdk';

const { NEON_API_KEY, GITHUB_SHA, GEMINI_API_KEY } = process.env;
if (!GEMINI_API_KEY?.trim()) throw new Error('Missing GitHub Actions secret GEMINI_API_KEY; refusing to deploy without AI credentials');
if (!NEON_API_KEY) throw new Error('Missing GitHub Actions secret NEON_API_KEY');
const projectId = 'aged-wildflower-12030818';
const branchId = 'br-wandering-hat-b9hqnoxc';
const slug = 'ideafixapp';
const url = 'https://br-wandering-hat-b9hqnoxc-ideafixapp.compute.c-7.eu-central-1.aws.neon.tech';
const zipPath = process.argv[2];
if (!zipPath) throw new Error('Usage: node deploy-neon.mjs <archive.zip>');
const neon = createNeonClient({ apiKey: NEON_API_KEY, throwOnError: true });
const archive = await readFile(zipPath);
console.log('Deploying verified IdeaFIX ZIP:', archive.byteLength, 'bytes');
const deployment = await neon.functions.deploy({
  projectId, branchId, slug,
  zip: new File([archive], 'ideafix-neon.zip', { type: 'application/zip' }),
  runtime: 'nodejs24',
  // Neon merges supplied keys with existing deployment environment; omitted keys remain unchanged.
  environment: { GEMINI_API_KEY: GEMINI_API_KEY.trim() }
});
console.log('Neon accepted deployment:', deployment?.id ?? 'pending');
const deadline = Date.now() + 240000;
let active = false;
while (Date.now() < deadline) {
  const fn = await neon.functions.get({ projectId, branchId, slug });
  const current = fn.current_deployment;
  const live = fn.active_deployment;
  if (current?.status === 'failed' || current?.status === 'error') throw new Error('Neon deployment failed');
  if (current?.status === 'completed' && live?.id === current.id) {
    active = true;
    console.log('Neon active deployment:', live.id);
    break;
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
}
if (!active) throw new Error('Timed out waiting for active Neon deployment');
for (const route of ['/', '/mobile.html', '/desktop.html', '/assets/voice.js']) {
  let verified = false;
  for (let attempt = 1; attempt <= 12; attempt++) {
    const response = await fetch(url + route + '?ci=' + encodeURIComponent(GITHUB_SHA || Date.now()) + '&attempt=' + attempt, {
      headers: { 'cache-control': 'no-cache' },
      signal: AbortSignal.timeout(20000)
    });
    if (response.ok) {
      if (route !== '/assets/voice.js') verified = true;
      else {
        const source = await response.text();
        verified = source.includes('ideafix-commit:' + GITHUB_SHA);
      }
    }
    if (verified) { console.log('OK', route, response.status); break; }
    console.log('Waiting for new revision on', route, 'attempt', attempt);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  if (!verified) throw new Error('Smoke test failed or deployed commit mismatch: ' + route);
}
console.log('IdeaFIX Neon deployment verified:', url);
