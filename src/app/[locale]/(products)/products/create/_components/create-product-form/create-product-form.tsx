'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Form } from '@/components/ui';
import { CreateProductDto, CreateProductSchema } from '@/lib/api';
import { ProductDefaultValues } from './config';
import { createProductAction } from '@/actions/product/product.actions';
import { ProductDetails, ProductSettings, ProductMedia, FormActions } from './_components';
import { Nullable } from '@/types/utils';

export const CreateProductForm = () => {
  const t = useTranslations('product.createProduct');
  const [serverError, setServerError] = useState<Nullable<string>>(null);

  const form = useForm<CreateProductDto>({
    resolver: zodResolver(CreateProductSchema) as never,
    defaultValues: ProductDefaultValues,
    mode: 'onChange',
  });

  const { handleSubmit } = form;

  async function onSubmit(data: CreateProductDto) {
    setServerError(null);
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('slug', data.slug);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    formData.append('isActive', String(data.isActive));
    if (data.description) formData.append('description', data.description);

    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => formData.append('files', file));
    }

    const result = await createProductAction(formData);

    if (result?.error) {
      setServerError(result.error);
      return;
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProductDetails form={form} />
            <ProductSettings form={form} />
          </div>

          <div className="space-y-6">
            <ProductMedia form={form} />
            <FormActions isSubmitting={form.formState.isSubmitting} serverError={serverError} />
          </div>
        </form>
      </Form>
    </div>
  );
};
