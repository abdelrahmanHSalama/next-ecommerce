"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

const Navbar = () => {
    const cartStateLength = useCartStore((state) => state.cart.length);
    const wishlistStateLength = useWishlistStore(
        (state) => state.wishlist.length
    );
    return (
        <nav className="flex gap-2">
            <Link
                href="/products"
                className="flex items-center gap-2 hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
            >
                <Icon icon="lucide:shopping-bag" width="20" height="20" />{" "}
                Products
            </Link>
            <Link
                href="/cart"
                className="flex items-center gap-2 hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
            >
                <Icon icon="lucide:shopping-cart" width="20" height="20" /> Cart{" "}
                {cartStateLength > 0 ? `(${cartStateLength})` : ""}
            </Link>
            <Link
                href="/wishlist"
                className="flex items-center gap-2 hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
            >
                <Icon icon="lucide:heart" width="20" height="20" /> Wishlist{" "}
                {wishlistStateLength > 0 ? `(${wishlistStateLength})` : ""}
            </Link>
        </nav>
    );
};

export default Navbar;
