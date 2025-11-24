import type { PageLoad } from './$types';
import { getCards, preloadMetadata } from '$lib/api/mtg';

export const load: PageLoad = async ({ fetch, url }) => {
  try {
    const page = Number(url.searchParams.get('page') || 1);
    const name = url.searchParams.get('name') || undefined;
    const set = url.searchParams.get('set') || undefined;
    const type = url.searchParams.get('type') || undefined;
    
    const [allCards, meta] = await Promise.all([
      getCards(fetch, { page, pageSize: 50, name, set, type }),
      preloadMetadata(fetch)
    ]);
    
    // Filtrar apenas cartas com imagem
    const cards = allCards.filter(card => card.imageUrl);
    
    return { 
      cards, 
      page, 
      filters: { name, set, type }, 
      sets: meta.sets || [],
      error: null
    };
  } catch (err) {
    console.error('Error loading cards:', err);
    return { 
      cards: [], 
      page: 1, 
      filters: {}, 
      sets: [],
      error: err instanceof Error ? err.message : 'Erro ao carregar cartas'
    };
  }
};
