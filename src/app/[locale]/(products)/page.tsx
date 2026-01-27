import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import { Product, productService } from '@/lib/api';
import { AppRoutes } from '@/lib/routes';
import { ProductGrid } from './_components';
import { Link } from '@/i18n';

export const dynamic = 'force-static';

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('product.list');

  let products: Product[] = [];

  try {
    products = await productService.getAll();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-end gap-4">
        <Link href={AppRoutes.app.products.create}>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            {t('addButton')}
          </Button>
        </Link>
      </div>

      <ProductGrid data={products} />
    </div>
  );
}
