'use client';

import { FC } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoriteStore } from '@/store/use-favorite-store';
import { Product } from '@/lib/api';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
}

export const FavoriteButton: FC<Props> = ({ product }) => {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFavorite = useFavoriteStore((state) => state.isFavorite(product.id));

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn(
        'rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white',
        isFavorite && 'text-red-500 hover:text-red-600',
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
      }}
    >
      <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
    </Button>
  );
};
