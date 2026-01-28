'use server';

import { favoriteService } from '@/lib/api';

export async function toggleFavoriteAction(productId: number) {
  try {
    const result = await favoriteService.toggle(productId);
    return { data: result };
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to toggle favorite' };
  }
}

export async function getFavoritesAction() {
  try {
    const favorites = await favoriteService.getAll();
    return { data: favorites };
  } catch (error) {
    console.error('Get favorites error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to fetch favorites' };
  }
}
