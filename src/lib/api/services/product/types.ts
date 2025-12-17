import { Nullable } from '@/types/utils';
import type { infer as ZodInfer } from 'zod';
import { CreateProductSchema } from './schemas';

export interface ProductMedia {
  id: number;
  width: number;
  height: number;
  secureUrl: string;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: Nullable<string>;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  mainImage: Nullable<ProductMedia>;
  images: ProductMedia[];
}

export interface ProductQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export type CreateProductDto = ZodInfer<typeof CreateProductSchema>;
