'use client';

import { ReactNode, useEffect } from 'react';
import { useFavoriteStore } from '@/store/use-favorite-store';
import { useCartStore } from '@/store/use-cart-store';
import { Product } from '@/lib/api';
import { CartItem } from '@/lib/api/services/cart/cart.service';
import { getFavoritesAction } from '@/actions/favorite/favorite.actions';
import { getCartAction } from '@/actions/cart/cart.actions';

interface Props {
  children: ReactNode;
  initialFavorites: Product[];
  initialCart: CartItem[];
}

export const StateProvider = ({ children, initialFavorites, initialCart }: Props) => {
  useEffect(() => {
    useFavoriteStore.setState({ favorites: initialFavorites });
    useCartStore.setState({ items: initialCart });

    if (initialFavorites.length === 0 && initialCart.length === 0) {
      const hydrate = async () => {
        const [favRes, cartRes] = await Promise.all([getFavoritesAction(), getCartAction()]);
        if (favRes.data) useFavoriteStore.setState({ favorites: favRes.data });
        if (cartRes.data) useCartStore.setState({ items: cartRes.data });
      };
      hydrate();
    }
  }, [initialFavorites, initialCart]);

  return <>{children}</>;
};
