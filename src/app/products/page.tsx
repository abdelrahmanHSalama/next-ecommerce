"use client";

import ProductsFilters from "@/components/ProductsFilters";
import ProductsListInfiniteScroll from "@/components/ProductsListInfiniteScroll";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Products() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        console.log("👨🏻 Selected Category:", selectedCategory);
    }, [selectedCategory]);

    return (
        <>
            <div className="mx-auto my-4 w-5/6 grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <ProductsFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>
                <div className="col-span-3">
                    <ProductsListInfiniteScroll
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </>
    );
}
