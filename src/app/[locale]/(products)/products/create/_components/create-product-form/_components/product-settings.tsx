import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { CreateProductDto } from '@/lib/api';
import { FC } from 'react';

interface Props {
  form: UseFormReturn<CreateProductDto>;
}

export const ProductSettings: FC<Props> = ({ form }) => {
  const t = useTranslations('product.createProduct.sections.settings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">{t('activeStatus')}</label>
            <p className="text-xs text-muted-foreground">{t('activeDescription')}</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...form.register('isActive')}
              className="h-4 w-4 rounded border-gray-300 accent-primary"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
