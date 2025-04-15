"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import Image from "next/image";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const WishlistItem = ({ product }: { product: Product }) => {
    const removeFromWishlist = useWishlistStore(
        (state) => state.removeFromWishlist
    );

    if (!product) return <div>Loading...</div>;

    return (
        <div className="flex items-center justify-between">
            <Image
                width={200}
                height={200}
                className="object-cover"
                src={product.thumbnail}
                alt={product.title}
            ></Image>
            <div className="flex-1">
                <h2>{product.title}</h2>
            </div>
            <div className="flex items-center flex-1 justify-end">
                <p className="">${product.price}</p>
                <button
                    className="p-2 cursor-pointer"
                    onClick={() => removeFromWishlist(product.id)}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default WishlistItem;
