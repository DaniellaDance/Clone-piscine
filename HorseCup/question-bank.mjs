// Only authored questions; discard exact duplicates and numeric-only variants.
const canonical = value => String(value ?? '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\b\d+(?:\.\d+)?\b/g, '#')
  .replace(/\s+/g, ' ')
  .trim().toLowerCase();

export function expandBank(original) {
  const seen = new Set();
  return original.filter(q => {
    const key = [q.lvl, q.quest, canonical(q.q), canonical(q.code)].join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
