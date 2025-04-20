"use client";

import { Icon } from "@iconify/react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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

    const router = useRouter();
    const { data: authData, status: authStatus } = useSession();
    const isLoggedIn = authStatus === "authenticated";

    const currentPath = usePathname();

    const handleClick = () => {
        if (isLoggedIn) {
            if (isInWishlist(productId)) {
                removeFromWishlist(productId);
            } else {
                addToWishlist(productId);
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
                    ? "absolute right-[5%] top-[5%] text-[#909090] hover:text-black"
                    : "bg-white border-2 border-black rounded-md p-2 hover:bg-black hover:text-white"
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
