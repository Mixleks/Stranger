// src/utils/progress.ts
const KEY = 'watch_progress_v1';

type K = { [episodeId: string]: { t: number; dur?: number; updated: number } };

const getAll = (): K => {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
};

export const saveProgress = (episodeId: string, t: number, dur?: number) => {
  const all = getAll();
  all[episodeId] = { t, dur, updated: Date.now() };
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const loadProgress = (episodeId: string): { t: number; dur?: number } | null => {
  const all = getAll();
  return all[episodeId] || null;
};

export const getLastWatched = () => {
  const all = getAll();
  const entries = Object.entries(all);
  if (!entries.length) return null;
  entries.sort((a, b) => b[1].updated - a[1].updated);
  const [episodeId, data] = entries[0];
  return { episodeId, ...data };
};
