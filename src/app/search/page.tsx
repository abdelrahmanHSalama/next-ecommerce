"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const searchProducts = async (searchParameters) => {
    const { data: searchResults } = await axios.get(
        `https://dummyjson.com/products/search?q=${searchParameters}`
    );
    return searchResults;
};

const Search = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("q");
        setSearchKeyword(query);
    }, [searchParams]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchKeyword.trim()) {
                setSearchResults([]);
                return;
            }
            const fetchedProducts = await searchProducts(searchKeyword);
            setSearchResults(fetchedProducts.products);
        };

        fetchResults();
    }, [searchKeyword]);

    console.log(searchResults);

    return (
        <div className="mx-auto my-4 w-5/6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                    <ProductCard
                        image={product.thumbnail}
                        title={product.title}
                        price={product.price}
                        id={product.id}
                        key={product.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Search;
