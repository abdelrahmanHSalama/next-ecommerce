"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "./ProductsList";
import { useState } from "react";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    thumbnail: string;
}

export default function HomeProductsList() {
    const [productsTab, setProductsTab] = useState(0);

    const productTabs = [
        { name: "New Arrivals", id: 0, startingIndex: 0 },
        { name: "Best Sellers", id: 1, startingIndex: 8 },
        { name: "Featured Products", id: 2, startingIndex: 16 },
    ];

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data: products } = await axios.get(
                `https://dummyjson.com/products?limit=24`
            );
            return products.products;
        },
        staleTime: 1000 * 60,
    });

    console.log(productsTab);

    return (
        <div>
            <ul className="flex gap-4 mb-4">
                {productTabs.map((productTab) => (
                    <li
                        key={productTab.id}
                        onClick={() => setProductsTab(productTab.id)}
                        className={`cursor-pointer text-lg transition duration-250 ${
                            productTab.id === productsTab
                                ? "font-bold text-black"
                                : "text-gray-500 hover:text-black transition duration-250"
                        }`}
                    >
                        {productTab.name}
                    </li>
                ))}
            </ul>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error...</p>
            ) : (
                <ProductsList
                    products={
                        data?.slice(
                            productTabs[productsTab].startingIndex,
                            productTabs[productsTab].startingIndex + 8
                        ) || []
                    }
                />
            )}
        </div>
    );
}
