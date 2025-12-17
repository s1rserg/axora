'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { productService } from '@/lib/api';
import { AppRoutes } from '@/lib/routes';
import { ActionState } from './types';

export async function createProductAction(formData: FormData): Promise<ActionState> {
  const t = await getTranslations('product.serverErrors');

  try {
    await productService.create(formData);

    revalidatePath(AppRoutes.app.root);
  } catch (error: unknown) {
    console.error('Create product error:', error);
    if (error instanceof Error) {
      return { error: t('createFailed') + ':' + error.message };
    }

    return { error: t('default') };
  }
  redirect(AppRoutes.app.root);
}
