'use client';

import { FC } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/use-cart-store';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  productId: number;
}

export const AddToCartButton: FC<Props> = ({ productId }) => {
  const t = useTranslations('product.list.cart');
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    await addItem(productId);
    setIsLoading(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant={isAdded ? 'secondary' : 'default'}
      className="w-full mt-2"
      disabled={isLoading}
      onClick={handleAdd}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {t('added')}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {t('addButton')}
        </>
      )}
    </Button>
  );
};
