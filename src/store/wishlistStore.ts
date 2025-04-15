import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
    id: number;
}

interface WishlistState {
    wishlist: WishlistItem[];
    addToWishlist: (id: number) => void;
    removeFromWishlist: (id: number) => void;
    clearWishlist: () => void;
    isInWishlist: () => void;
}

export const useWishlistState = create<WishlistState>()(
    persist<WishlistState>(
        (set, get) => ({
            wishlist: [],

            addToWishlist: (id: number) => {
                set((state) => {
                    const itemExists = state.wishlist.some((item) => item.id === id);

                    if (itemExists) {
                        return state;
                    } else {
                        return {
                            wishlist: [...state.wishlist, {id}]
                        }
                    }
                });
            },

            removeFromWishlist,

            clearWishlist,

            isInWishlist
        }), {name: "wishlist-state"}
    );
);
