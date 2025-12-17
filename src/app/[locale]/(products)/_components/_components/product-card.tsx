import Image from 'next/image';
import { getFormatter, getTranslations } from 'next-intl/server';
import { Badge, Card, CardContent } from '@/components/ui';
import { Product } from '@/lib/api';
import { FC } from 'react';
import { ImageOff } from 'lucide-react';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = async ({ product }) => {
  const t = await getTranslations('product.list.status');
  const format = await getFormatter();

  return (
    <Card className="overflow-hidden flex flex-col h-full group py-0 transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] bg-muted">
        {product.mainImage ? (
          <Image
            src={product.mainImage.secureUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
            <ImageOff />
          </div>
        )}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge
            variant={product.isActive ? 'default' : 'secondary'}
            className="w-fit shadow-sm backdrop-blur-sm bg-opacity-90"
          >
            {product.isActive ? t('active') : t('draft')}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex align-center justify-between">
          <h3 className="font-semibold text-lg" title={product.title}>
            {product.title}
          </h3>
          <span className="font-semibold text-lg">
            {format.number(product.price, { style: 'currency', currency: 'USD' })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
