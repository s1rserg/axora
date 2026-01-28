import { create } from 'zustand';
import { Product } from '@/lib/api';
import { toggleFavoriteAction } from '@/actions/favorite/favorite.actions';

interface FavoriteState {
  favorites: Product[];
  isLoading: boolean;
  setFavorites: (favorites: Product[]) => void;
  toggleFavorite: (product: Product) => Promise<void>;
  isFavorite: (productId: number) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  isLoading: false,
  setFavorites: (favorites) => set({ favorites }),
  toggleFavorite: async (product) => {
    const { favorites } = get();
    const isFav = favorites.some((f) => f.id === product.id);

    if (isFav) {
      set({ favorites: favorites.filter((f) => f.id !== product.id) });
    } else {
      set({ favorites: [...favorites, product] });
    }

    const { error, data } = await toggleFavoriteAction(product.id);

    if (error) {
      set({ favorites });
      console.error(error);
    } else if (data) {
    }
  },
  isFavorite: (productId) => get().favorites.some((f) => f.id === productId),
}));
