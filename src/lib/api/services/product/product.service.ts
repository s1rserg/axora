import { fetchClient } from '../../fetch-client';
import type { Product } from './types';

class ProductService {
  public async getAll(): Promise<Product[]> {
    return fetchClient<Product[]>('/products', {
      method: 'GET',
      skipAuth: true,
    });
  }

  public async getOne(id: number): Promise<Product> {
    return fetchClient<Product>(`/products/${id}`, {
      method: 'GET',
    });
  }

  public async create(formData: FormData): Promise<Product> {
    return fetchClient<Product>('/products', {
      method: 'POST',
      body: formData,
    });
  }
}

export const productService = new ProductService();
