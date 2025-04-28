"use client";

import { useState, useEffect } from "react";
import CartItem from "@/components/CartItem";
import CheckoutModal from "@/components/CheckoutModal";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const CartPageClient = () => {
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const [productsInCart, setProductsInCart] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            <div className="flex lg:flex-row flex-col lg:gap-8">
                <div className="flex-2 flex flex-col">
                    {cart.length > 0
                        ? cart.map((item) => {
                              const product = productsInCart.find(
                                  (product) => product.id === item.id
                              );
                              return product ? (
                                  <CartItem
                                      product={product}
                                      quantity={item.quantity}
                                      key={product.id}
                                  />
                              ) : null;
                          })
                        : "There are no items in your cart! 😢"}
                </div>
                <div className="flex-1 border border-[#EBEBEB] rounded-md p-8 flex flex-col gap-4 h-min">
                    <h1 className="text-xl font-bold">Order Summary</h1>
                    {/* <div className="flex flex-col gap-2">
                        <p>Promo Code</p>
                        <input
                            type="text"
                            placeholder="Enter Promo Code"
                            className="border border-[#A3A3A3] rounded-md p-2"
                        ></input>
                    </div> */}
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>${formattedSubtotal}</p>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <p>Delivery</p>
                            <p>${delivery}</p>
                        </div>
                        <p className="text-green-600 text-xs">
                            Delivery is free for all orders for a limited time!
                            😄
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>${formattedTotal}</p>
                    </div>
                    <button
                        className={
                            cart.length > 0
                                ? "text-white bg-black border-2 border-black rounded-md p-2 cursor-pointer lg:hover:text-black lg:hover:bg-white transition duration-250"
                                : "cursor-not-allowed bg-[#D4D4D4] border-[#D4D4D4] rounded-md p-2 transition duration-250"
                        }
                        onClick={() => {
                            if (cart.length > 0) {
                                setIsModalOpen(true);
                            }
                        }}
                    >
                        Checkout
                    </button>
                    <button
                        className={
                            cart.length > 0
                                ? "text-white bg-red-500 border-2 border-red-500 rounded-md p-2 cursor-pointer lg:hover:text-red-500 lg:hover:bg-white transition duration-250"
                                : "cursor-not-allowed bg-[#D4D4D4] border-[#D4D4D4] rounded-md p-2 transition duration-250"
                        }
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default CartPageClient;
