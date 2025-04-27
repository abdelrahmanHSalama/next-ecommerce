"use client";

import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CartButton = ({
    className,
    productId,
}: {
    className?: string;
    productId: number;
}) => {
    const [buttonState, setButtonState] = useState(false);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const isInCart = useCartStore((state) => state.isInCart);

    const router = useRouter();
    const { status: authStatus } = useSession();
    const isLoggedIn = authStatus === "authenticated";

    const currentPath = usePathname();

    const handleClick = () => {
        if (isLoggedIn) {
            if (isInCart(productId)) {
                removeFromCart(productId);
                setButtonState(!buttonState);
            } else {
                addToCart(productId);
                setButtonState(!buttonState);
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
                className={`text-white bg-black border-2 border-black rounded-md px-4 py-2 cursor-pointer hover:text-black hover:bg-white transition duration-250 ${className}`}
                onClick={handleClick}
            >
                {isInCart(productId) ? "Remove from Cart" : "Add to Cart"}
            </button>
        </>
    );
};

export default CartButton;
