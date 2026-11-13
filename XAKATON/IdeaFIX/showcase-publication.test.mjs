import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Guard against an old idea appearing as newly published in the wrong period.
// The two front-end lists must use publication time, with a fallback for legacy data.
const app = readFileSync(new URL('./public/assets/app.js', import.meta.url), 'utf8');
test('home and full idea showroom rank tied votes by publication time', () => {
  assert.match(app, /function showcaseDateMatch\(t\)[\s\S]*?new Date\(t\.published_at\|\|t\.created\)/);
  assert.equal((app.match(/new Date\(b\.published_at\|\|b\.created\)-new Date\(a\.published_at\|\|a\.created\)/g) || []).length, 2);
  const old = { created:'2026-10-01T12:00:00Z', published_at:'2026-11-12T12:00:00Z', votes:2 };
  const newer = { created:'2026-11-01T12:00:00Z', published_at:'2026-11-10T12:00:00Z', votes:2 };
  const rank = (a,b) => (b.votes||0)-(a.votes||0)||new Date(b.published_at||b.created)-new Date(a.published_at||a.created);
  assert.deepEqual([newer,old].sort(rank),[old,newer]);
});
