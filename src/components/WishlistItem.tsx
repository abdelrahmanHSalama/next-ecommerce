"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const WishlistItem = ({
    product,
    quantity,
}: {
    product: Product;
    quantity: number;
}) => {
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

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
            <button
                className="p-2 cursor-pointer"
                onClick={() => removeFromCart(product.id)}
            >
                ×
            </button>
        </div>
    );
};

export default WishlistItem;
