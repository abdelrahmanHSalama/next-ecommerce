import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  isInCart: (id: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      cart: [],

      addToCart: (id: number) => {
        set((state) => {
          const itemExists = get().isInCart(id);

          if (itemExists) {
            return state;
          } else {
            return {
              cart: [...state.cart, { id, quantity: 1 }],
            };
          }
        });
      },

      removeFromCart: (id: number) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      increaseQuantity: (id: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decreaseQuantity: (id: number) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ cart: [] }),

      isInCart: (id: number) => {
        return get().cart.some((item) => item.id === id);
      },
    }),
    { name: "cart-state" }
  )
);

export const useIsInCart = (id: number) => useCartStore((s) => s.isInCart(id));

export const useAddToCart = () => useCartStore((s) => s.addToCart);
export const useRemoveFromCart = () => useCartStore((s) => s.removeFromCart);
export const useIncreaseQuantity = () =>
  useCartStore((s) => s.increaseQuantity);
export const useDecreaseQuantity = () =>
  useCartStore((s) => s.decreaseQuantity);
export const useClearCart = () => useCartStore((s) => s.clearCart);

export const useCartCount = () => useCartStore((s) => s.cart.length);

export const useCartItemQuantity = (id: number) =>
  useCartStore((s) => s.cart.find((i) => i.id === id)?.quantity ?? 0);
