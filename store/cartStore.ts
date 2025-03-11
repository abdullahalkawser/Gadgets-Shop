import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem, quantity: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item, quantity) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      } else {
        return { items: [...state.items, { ...item, quantity }] };
      }
    });
  },

  increment: (id) => {
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { items: updatedItems };
    });
  },

  decrement: (id) => {
    set((state) => {
      const updatedItems = state.items
        .map((item) =>
          item.id === id && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity reaches 0
      return { items: updatedItems };
    });
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
