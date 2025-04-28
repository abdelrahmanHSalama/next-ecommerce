"use client";

import { useState, useEffect } from "react";
import WishlistItem from "@/components/WishlistItem";
import { useWishlistStore } from "@/store/wishlistStore";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const WishlistPageClient = () => {
    const wishlist = useWishlistStore((state) => state.wishlist);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);
    const [productsInWishlist, setProductsInWishlist] = useState<Product[]>([]);

    const fetchProductDetails = async (id: string) => {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/products/${id}`
            );
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("An unknown error occurred:", error);
            }
            return null;
        }
    };

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            const fetchResults = await Promise.all(
                wishlist.map((item) => fetchProductDetails(item.id.toString()))
            );
            setProductsInWishlist(fetchResults.filter(Boolean) as Product[]);
        };
        fetchWishlistProducts();
    }, [wishlist]);

    return (
        <div className="mx-auto mt-4 w-5/6 lg:w-1/2">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Wishlist</h2>
                <button
                    className={
                        wishlist.length > 0
                            ? "text-white bg-red-500 border-2 border-red-500 rounded-md p-2 cursor-pointer lg:hover:text-red-500 lg:hover:bg-white transition duration-250"
                            : "cursor-not-allowed bg-[#D4D4D4] border-[#D4D4D4] rounded-md p-2 transition duration-250"
                    }
                    onClick={clearWishlist}
                >
                    Clear Wishlist
                </button>
            </div>
            <div className="flex flex-col">
                {wishlist.length > 0
                    ? wishlist.map((item) => {
                          const product = productsInWishlist.find(
                              (product) => product.id === item.id
                          );
                          return product ? (
                              <WishlistItem
                                  product={product}
                                  key={product.id}
                              />
                          ) : null;
                      })
                    : "There are no items in your wishlist! 😢"}
            </div>
        </div>
    );
};

export default WishlistPageClient;
