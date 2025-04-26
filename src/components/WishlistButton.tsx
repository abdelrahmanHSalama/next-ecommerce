"use client";

import { Icon } from "@iconify/react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

const WishlistButton = ({
    className,
    style,
    productId,
}: {
    className?: string;
    style: string;
    productId: number;
}) => {
    const [buttonState, setButtonState] = useState(false);
    const addToWishlist = useWishlistStore((state) => state.addToWishlist);
    const removeFromWishlist = useWishlistStore(
        (state) => state.removeFromWishlist
    );
    const isInWishlist = useWishlistStore((state) => state.isInWishlist);

    const router = useRouter();
    const { status: authStatus } = useSession();
    const isLoggedIn = authStatus === "authenticated";

    const currentPath = usePathname();

    const handleClick = () => {
        if (isLoggedIn) {
            if (isInWishlist(productId)) {
                removeFromWishlist(productId);
                setButtonState(!buttonState);
            } else {
                addToWishlist(productId);
                setButtonState(!buttonState);
            }
        } else {
            router.push(
                `/account?callbackUrl=${encodeURIComponent(currentPath)}`
            );
        }
    };

    return (
        <button
            className={` ${className} cursor-pointer transition duration-250 ${
                style === "mini"
                    ? "absolute right-[5%] top-[5%] text-[#909090] hover:text-black active:text-black"
                    : "bg-white border-2 border-black rounded-md p-2 hover:bg-black hover:text-white active:bg-black active:text-white"
            }`}
            onClick={handleClick}
        >
            {style === "full" ? (
                isInWishlist(productId) ? (
                    "Remove from Wishlist"
                ) : (
                    "Add to Wishlist"
                )
            ) : isInWishlist(productId) ? (
                <Icon icon="lucide:heart-off" width="24" height="24" />
            ) : (
                <Icon icon="lucide:heart" width="24" height="24" />
            )}
        </button>
    );
};

export default WishlistButton;
