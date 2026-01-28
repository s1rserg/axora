'use server';

import { cartService } from '@/lib/api';

export async function addToCartAction(productId: number, quantity: number = 1) {
  try {
    const result = await cartService.addToCart(productId, quantity);
    return { data: result };
  } catch (error) {
    console.error('Add to cart error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to add to cart' };
  }
}

export async function removeFromCartAction(itemId: number) {
  try {
    await cartService.removeFromCart(itemId);
    return { success: true };
  } catch (error) {
    console.error('Remove from cart error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to remove from cart' };
  }
}

export async function updateCartQuantityAction(itemId: number, quantity: number) {
  try {
    const result = await cartService.updateQuantity(itemId, quantity);
    return { data: result };
  } catch (error) {
    console.error('Update cart quantity error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to update quantity' };
  }
}

export async function getCartAction() {
  try {
    const cart = await cartService.getCart();
    return { data: cart };
  } catch (error) {
    console.error('Get cart error:', error);
    return { error: error instanceof Error ? error.message : 'Failed to fetch cart' };
  }
}
