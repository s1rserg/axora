import { create } from 'zustand';
import { CartItem } from '@/lib/api/services/cart/cart.service';
import {
  addToCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from '@/actions/cart/cart.actions';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  setItems: (items: CartItem[]) => void;
  addItem: (productId: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  totalCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  setItems: (items) => set({ items }),
  addItem: async (productId) => {
    const { items } = get();

    set({ isLoading: true });
    const { data, error } = await addToCartAction(productId);
    if (data) {
      const existingItemIndex = items.findIndex((i) => i.productId === productId);
      if (existingItemIndex > -1) {
        const newItems = [...items];
        newItems[existingItemIndex] = data;
        set({ items: newItems });
      } else {
        set({ items: [...items, data] });
      }
    } else if (error) {
      console.error(error);
    }
    set({ isLoading: false });
  },
  removeItem: async (itemId) => {
    const { items } = get();
    set({ items: items.filter((i) => i.id !== itemId) });
    await removeFromCartAction(itemId);
  },
  updateQuantity: async (itemId, quantity) => {
    if (quantity < 1) return;
    const { items } = get();
    const oldItems = [...items];
    const newItems = items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
    set({ items: newItems });

    const { error } = await updateCartQuantityAction(itemId, quantity);
    if (error) {
      set({ items: oldItems });
    }
  },
  totalCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
}));
