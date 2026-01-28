'use client';

import { useCartStore } from '@/store/use-cart-store';
import { ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { AppRoutes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const CartLink = () => {
  const totalCount = useCartStore((state) => state.totalCount());

  return (
    <Link
      href={AppRoutes.app.cart}
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'relative')}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
          {totalCount}
        </span>
      )}
    </Link>
  );
};
