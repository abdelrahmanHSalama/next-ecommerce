"use client";

import ProductsFilters from "@/components/ProductsFilters";
import ProductsListInfiniteScroll from "@/components/ProductsListInfiniteScroll";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductsPageClient() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const searchParams = useSearchParams();

    useEffect(() => {
        const qCategory = searchParams.get("category") || "all";
        setSelectedCategory(qCategory);
    }, []);

    return (
        <div className="mx-auto w-5/6 grid grid-cols-4 gap-4 my-8">
            <div className="col-span-1">
                <ProductsFilters
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                />
            </div>
            <div className="col-span-3">
                <ProductsListInfiniteScroll
                    selectedCategory={selectedCategory}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                />
            </div>
        </div>
    );
}
