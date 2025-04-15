import ProductsList from "@/components/ProductsList";
import axios from "axios";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Home | Next ECommerce",
};

async function fetchProducts() {
    const { data: products } = await axios.get(
        "https://dummyjson.com/products?limit=4"
    );
    return products.products;
}

export default async function Home() {
    const products = await fetchProducts();
    return (
        <>
            <div className="relative w-full h-[calc(100vh-72px)]">
                <Image
                    src="/banner.png"
                    alt="Banner"
                    fill
                    className="object-cover"
                />
            </div>
            {/* TODO: Revamp the Hero Section */}
            <div className="mx-auto my-4 w-5/6">
                <h3 className="mb-2 text-xl font-bold">Featured Products</h3>
                <ProductsList initialProducts={products} limit={4} />
            </div>
        </>
    );
}
