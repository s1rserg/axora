import { CreateProductDto } from '@/lib/api';

export const ProductDefaultValues: CreateProductDto = {
  title: '',
  slug: '',
  description: '',
  price: 0,
  stock: 10,
  isActive: true,
  files: [],
};
