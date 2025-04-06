"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    thumbnail: string;
}

export default function ProductsList({
    limit,
    initialProducts,
}: {
    limit?: number;
    initialProducts: Product[];
}) {
    const {
        data = initialProducts,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products", limit],
        queryFn: async () => {
            const { data: products } = await axios.get(
                `https://dummyjson.com/products?limit=${limit}`
            );
            return products.products;
        },
        initialData: initialProducts,
        staleTime: 1000 * 60,
    });

    if (isLoading) return <p>Loading...</p>; // Show loading state while fetching
    if (isError) return <p>Error fetching products.</p>; // Handle errors

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((product: Product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <ProductCard
                        image={product.thumbnail}
                        title={product.title}
                        price={product.price}
                    />
                </Link>
            ))}
        </div>
    );
}
