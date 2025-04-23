"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
}

const CartItem = ({
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
        <div className="flex items-center justify-between border-2 border-[#f5f5f5] rounded-md mb-4 p-2">
            <Link href={`products/${product.id}`}>
                <Image
                    width={100}
                    height={100}
                    className="mr-2 ml-1"
                    src={product.thumbnail}
                    alt={product.title}
                ></Image>
            </Link>
            <Link href={`products/${product.id}`} className="flex-1">
                <h2>{product.title}</h2>
            </Link>
            <div className="flex items-center flex-1 justify-evenly">
                <div className="flex items-center">
                    <button
                        className="m-1 cursor-pointer hover:bg-[#D9D9D9] rounded-full h-[40px] w-[40px]"
                        onClick={() => decreaseQuantity(product.id)}
                    >
                        -
                    </button>
                    <div className="px-3 border-2 h-min border-[#D9D9D9] rounded-md w-[3rem] text-center">
                        {quantity}
                    </div>
                    <button
                        className="m-1 cursor-pointer hover:bg-[#D9D9D9] rounded-full h-[40px] w-[40px]"
                        onClick={() => increaseQuantity(product.id)}
                    >
                        +
                    </button>
                </div>
                <p className="">${product.price}</p>
                <button
                    className="m-1 cursor-pointer hover:bg-[#D9D9D9] rounded-full h-[40px] w-[40px]"
                    onClick={() => removeFromCart(product.id)}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default CartItem;
