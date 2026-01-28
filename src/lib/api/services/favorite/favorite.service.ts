import { fetchClient } from '../../fetch-client';
import { Product } from '../product/types';

class FavoriteService {
  public async getAll(): Promise<Product[]> {
    return fetchClient<Product[]>('/favorites', {
      method: 'GET',
    });
  }

  public async toggle(productId: number): Promise<{ isFavorite: boolean }> {
    return fetchClient<{ isFavorite: boolean }>(`/favorites/toggle/${productId}`, {
      method: 'POST',
    });
  }
}

export const favoriteService = new FavoriteService();
