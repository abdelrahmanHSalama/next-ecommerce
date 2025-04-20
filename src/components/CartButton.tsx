"use client";

import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const CartButton = ({
    className,
    productId,
}: {
    className?: string;
    productId: number;
}) => {
    const cartState = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const isInCart = useCartStore((state) => state.isInCart);

    const router = useRouter();
    const { data: authData, status: authStatus } = useSession();
    const isLoggedIn = authStatus === "authenticated";

    const currentPath = usePathname();

    const handleClick = () => {
        if (isLoggedIn) {
            if (isInCart(productId)) {
                removeFromCart(productId);
            } else {
                addToCart(productId);
            }
        } else {
            router.push(
                `/account?callbackUrl=${encodeURIComponent(currentPath)}`
            );
        }
    };

    return (
        <>
            <button
                className={`text-white bg-black border-2 border-black rounded-md p-2 hover:cursor-pointer hover:text-black hover:bg-white transition duration-250 ${className}`}
                onClick={handleClick}
            >
                {isInCart(productId) ? "Remove from Cart" : "Add to Cart"}
            </button>
        </>
    );
};

export default CartButton;
