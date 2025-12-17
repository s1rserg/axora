import { UseFormReturn, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { ImageUploader } from '@/components/image-uploader';
import { CreateProductDto } from '@/lib/api';
import { FC } from 'react';

interface Props {
  form: UseFormReturn<CreateProductDto>;
}

export const ProductMedia: FC<Props> = ({ form }) => {
  const t = useTranslations('product.createProduct.sections.media');
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  const files = useWatch({ control, name: 'files' });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ImageUploader
          value={files || []}
          onChange={(newFiles) => {
            setValue('files', newFiles, { shouldValidate: true });
          }}
          error={errors.files?.message?.toString()}
          i18nPrefix="product"
        />
      </CardContent>
    </Card>
  );
};
