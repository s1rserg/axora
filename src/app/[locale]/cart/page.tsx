'use client';

import { useCartStore } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useFormatter } from 'next-intl';
import { Link } from '@/i18n/routing';
import { AppRoutes } from '@/lib/routes';

export default function CartPage() {
  const t = useTranslations('cart');
  const format = useFormatter();
  const { items, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">{t('empty.title')}</h2>
        <p className="mt-2 text-muted-foreground">{t('empty.description')}</p>
        <Link href={AppRoutes.app.root} className="mt-8">
          <Button>{t('empty.button')}</Button>
        </Link>
      </div>
    );
  }

  const totalPrice = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">{t('title')}</h1>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-4 transition-all hover:shadow-sm"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                  {item.product.mainImage ? (
                    <Image
                      src={item.product.mainImage.secureUrl}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
                      <ShoppingBag />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format.number(item.product.price, { style: 'currency', currency: 'USD' })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col items-end gap-2 px-4 min-w-[100px]">
                  <p className="font-semibold">
                    {format.number(item.product.price * item.quantity, {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-lg border p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">{t('summary.title')}</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>{t('summary.subtotal')}</span>
                <span>{format.number(totalPrice, { style: 'currency', currency: 'USD' })}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{t('summary.shipping')}</span>
                <span>{t('summary.free')}</span>
              </div>
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('summary.total')}</span>
                  <span>{format.number(totalPrice, { style: 'currency', currency: 'USD' })}</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6" size="lg">
              {t('summary.checkout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
