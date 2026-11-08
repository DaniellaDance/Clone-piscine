// Keep only authored, distinct questions. Never multiply one task by changing numbers.
export function expandBank(original) {
  const seen = new Set();
  return original.filter(q => {
    const key = [q.lvl, q.quest, q.q.replace(/<[^>]*>/g, '').trim(), q.code || '', ...q.opts].join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
