import type { Card, Set, ListParams } from './types';

// Base configurável via env público (build-time) ou fallback.
const BASE = import.meta.env.PUBLIC_MTG_API_BASE ?? 'https://api.magicthegathering.io/v1';

// Cache simples em memória por URL (+ TTL). Adequado para SSR curto e navegação.
interface CacheEntry { timestamp: number; data: any }
const cache = new Map<string, CacheEntry>();
const TTL_MS = 60_000; // 60s

function buildQuery(params: Record<string, unknown>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === '' || v === null) continue;
    usp.set(k, String(v));
  }
  const qs = usp.toString();
  return qs ? `?${qs}` : '';
}

async function request<T>(path: string, fetchFn: typeof fetch, params?: Record<string, unknown>): Promise<T> {
  const url = `${BASE}${path}${params ? buildQuery(params) : ''}`;
  const now = Date.now();
  const cached = cache.get(url);
  if (cached && now - cached.timestamp < TTL_MS) {
    return cached.data as T;
  }
  
  const res = await fetchFn(url);
  if (!res.ok) {
    throw new Error(`MTG API error ${res.status} for ${url}`);
  }
  const data = await res.json();
  cache.set(url, { timestamp: now, data });
  return data as T;
}

// Listar cartas com filtros básicos.
export async function getCards(fetchFn: typeof fetch, params: ListParams = {}): Promise<Card[]> {
  const data = await request<{ cards: Card[] }>('/cards', fetchFn, params);
  return data.cards;
}

export async function getCard(fetchFn: typeof fetch, id: string): Promise<Card | null> {
  const data = await request<{ card?: Card }>(`/cards/${id}`, fetchFn);
  return data.card ?? null;
}

export async function getSets(fetchFn: typeof fetch): Promise<Set[]> {
  const data = await request<{ sets: Set[] }>('/sets', fetchFn);
  return data.sets;
}

// Pré-carrega alguns metadados úteis (sets) para filtros.
export async function preloadMetadata(fetchFn: typeof fetch) {
  const [sets] = await Promise.all([
    getSets(fetchFn)
  ]);
  return { sets };
}
