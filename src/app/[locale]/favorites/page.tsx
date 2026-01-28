import { getTranslations, setRequestLocale } from 'next-intl/server';
import { favoriteService, Product } from '@/lib/api';
import { ProductGrid } from '../(products)/_components';
import { auth } from '@/auth';

export default async function FavoritesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('favorites');
  const session = await auth();

  if (!session) {
    return null;
  }

  let favorites: Product[] = [];
  try {
    favorites = await favoriteService.getAll();
  } catch (error: unknown) {
    console.error('Failed to fetch favorites:', error);
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <ProductGrid data={favorites} />
    </div>
  );
}
