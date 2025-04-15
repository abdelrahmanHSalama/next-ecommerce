"use client";

import { useCartStore } from "@/store/cartStore";

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

    const handleClick = () => {
        if (isInCart(productId)) {
            removeFromCart(productId);
        } else {
            addToCart(productId);
        }
    };

    console.log(cartState);

    return (
        <button
            className={`text-sm text-white bg-black border-2 border-black rounded-md p-2 hover:cursor-pointer hover:text-black hover:bg-white transition duration-250 ${className}`}
            onClick={handleClick}
        >
            {isInCart(productId) ? "Remove from Cart" : "Add to Cart"}
        </button>
    );
};

export default CartButton;
