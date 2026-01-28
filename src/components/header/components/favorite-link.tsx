'use client';

import { useFavoriteStore } from '@/store/use-favorite-store';
import { Heart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { AppRoutes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const FavoriteLink = () => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const count = favorites.length;

  return (
    <Link
      href={AppRoutes.app.favorites}
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'relative')}
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
          {count}
        </span>
      )}
    </Link>
  );
};
