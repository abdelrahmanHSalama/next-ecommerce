// TODO: Work in Progress

"use client";

import { useState, useEffect } from "react";
import WishlistItem from "@/components/WishlistItem";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const Cart = () => {
    const cart = useCartStore((state) => state.cart);
    const [productsInCart, setProductsInCart] = useState<Product[]>([]);
    console.log("cart:", cart);

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
        const fetchCartProducts = async () => {
            const fetchResults = await Promise.all(
                cart.map((item) => fetchProductDetails(item.id.toString()))
            );
            setProductsInCart(fetchResults.filter(Boolean) as Product[]);
        };
        fetchCartProducts();
    }, [cart]);

    console.log("productsInCart:", productsInCart);

    const subtotal = cart.reduce((total, item) => {
        const product = productsInCart.find(
            (product) => product.id === item.id
        );
        if (!product) return total;
        return total + product.price * item.quantity;
    }, 0);

    const delivery = 0;
    const total = subtotal + delivery;

    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTotal = total.toFixed(2);

    return (
        <div className="mx-auto my-4 w-5/6">
            <h1 className="text-xl font-bold">Wishlist</h1>
            <div className="flex gap-8 mt-2 flex-col">
                {cart.map((item) => {
                    const product = productsInCart.find(
                        (product) => product.id === item.id
                    );
                    return product ? (
                        <WishlistItem
                            product={product}
                            quantity={item.quantity}
                            key={product.id}
                        />
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default Cart;
