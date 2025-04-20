// TODO: Work in Progress

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

const Wishlist = () => {
    const wishlist = useWishlistStore((state) => state.wishlist);
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
        <div className="mx-auto my-4 w-5/6">
            <h1 className="text-xl font-bold">Wishlist</h1>
            <div className="flex gap-8 mt-2 flex-col">
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

export default Wishlist;
