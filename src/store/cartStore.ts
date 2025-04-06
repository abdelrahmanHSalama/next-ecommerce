import { create } from "zustand";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    thumbnail: string;
    quantity: number;
}

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],

    addToCart: (product) => {
        set((state) => {
            const itemExists = state.cart.some(
                (item) => item.id === product.id
            );

            if (itemExists) {
                return state;
            } else {
                return {
                    cart: [...state.cart, { ...product, quantity: 1 }],
                };
            }
        });
    },

    removeFromCart: (id) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        }));
    },

    increaseQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
        }));
    },

    decreaseQuantity: (id) => {
        set((state) => ({}));
    },

    clearCart: () => set({ cart: [] }),
}));
