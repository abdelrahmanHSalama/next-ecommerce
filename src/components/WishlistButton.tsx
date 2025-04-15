"use client";

import { Icon } from "@iconify/react";
import { useWishlistStore } from "@/store/wishlistStore";

const WishlistButton = ({
    className,
    style,
    productId,
}: {
    className?: string;
    style: string;
    productId: number;
}) => {
    const wishlistState = useWishlistStore((state) => state.wishlist);
    const addToWishlist = useWishlistStore((state) => state.addToWishlist);
    const removeFromWishlist = useWishlistStore(
        (state) => state.removeFromWishlist
    );
    const isInWishlist = useWishlistStore((state) => state.isInWishlist);

    const handleClick = () => {
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    return (
        <button
            className={`bg-white border-2 border-black rounded-md p-2 hover:cursor-pointer hover:bg-black hover:text-white transition duration-250 ${className}`}
            onClick={handleClick}
        >
            {style === "full" ? (
                isInWishlist(productId) ? (
                    "Remove from Wishlist"
                ) : (
                    "Add to Wishlist"
                )
            ) : isInWishlist(productId) ? (
                <Icon icon="lucide:heart-off" width="18" height="18" />
            ) : (
                <Icon icon="lucide:heart" width="18" height="18" />
            )}
        </button>
    );
};

export default WishlistButton;
