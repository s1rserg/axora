import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { FormInput } from '@/components/form-input';
import { slugify } from '../helpers';
import { CreateProductDto } from '@/lib/api';
import { ChangeEvent, FC } from 'react';

interface Props {
  form: UseFormReturn<CreateProductDto>;
}

export const ProductDetails: FC<Props> = ({ form }) => {
  const t = useTranslations('product.createProduct');
  const { control, setValue, clearErrors, register } = form;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title) {
      setValue('slug', slugify(title), { shouldValidate: true });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('sections.details.title')}</CardTitle>
        <CardDescription>{t('sections.details.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormInput<CreateProductDto>
          control={control}
          clearErrors={clearErrors}
          name="title"
          label={t('fields.title.label')}
          placeholder={t('fields.title.placeholder')}
          onChangeCapture={handleTitleChange}
          i18nPrefix="product"
        />

        <FormInput<CreateProductDto>
          control={control}
          clearErrors={clearErrors}
          name="slug"
          label={t('fields.slug.label')}
          placeholder={t('fields.slug.placeholder')}
          i18nPrefix="product"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput<CreateProductDto>
            control={control}
            clearErrors={clearErrors}
            name="price"
            label={t('fields.price.label')}
            type="number"
            placeholder={t('fields.price.placeholder')}
            i18nPrefix="product"
          />
          <FormInput<CreateProductDto>
            control={control}
            clearErrors={clearErrors}
            name="stock"
            label={t('fields.stock.label')}
            type="number"
            placeholder={t('fields.stock.placeholder')}
            i18nPrefix="product"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t('fields.description.label')}</label>
          <textarea
            {...register('description')}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={t('fields.description.placeholder')}
          />
        </div>
      </CardContent>
    </Card>
  );
};
