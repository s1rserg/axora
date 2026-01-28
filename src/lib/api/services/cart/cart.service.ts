import { fetchClient } from '../../fetch-client';
import { Product } from '../product/types';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

class CartService {
  public async getCart(): Promise<CartItem[]> {
    return fetchClient<CartItem[]>('/cart', {
      method: 'GET',
    });
  }

  public async addToCart(productId: number, quantity: number = 1): Promise<CartItem> {
    return fetchClient<CartItem>('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  public async removeFromCart(itemId: number): Promise<void> {
    return fetchClient<void>(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  }

  public async updateQuantity(itemId: number, quantity: number): Promise<CartItem> {
    return fetchClient<CartItem>(`/cart/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  }
}

export const cartService = new CartService();
