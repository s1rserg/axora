import { getTranslations } from 'next-intl/server';
import { ProductCard } from './_components';
import { Product } from '@/lib/api';
import { FC } from 'react';

interface Props {
  data: Product[];
}

export const ProductGrid: FC<Props> = async ({ data }) => {
  const t = await getTranslations('product.list');

  if (data.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
        <h3 className="mt-4 text-lg font-semibold">{t('empty')}</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
