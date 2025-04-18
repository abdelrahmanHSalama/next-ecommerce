"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const searchProducts = async (searchParameters) => {
    const { data: searchResults } = await axios.get(
        `https://dummyjson.com/products/search?q=${searchParameters}`
    );
    return searchResults;
};

const Search = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchKeyword.trim()) {
                setSearchResults([]);
                return;
            }
            const fetchedProducts = await searchProducts(searchKeyword);
            setSearchResults(fetchedProducts);
        };

        fetchResults();
    }, [searchKeyword]);

    return (
        <div
            className={`relative ${
                searchKeyword
                    ? "bg-[#D4D4D4] rounded-t-md"
                    : "bg-[#F5F5F5] rounded-md"
            }`}
        >
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Icon icon="lucide:search" width="20" height="20" />
            </span>
            <input
                type="text"
                placeholder="Search"
                className={`rounded-md p-2 pl-9 w-64 ${
                    searchKeyword
                        ? "bg-[#D4D4D4] rounded-t-md outline-none"
                        : "bg-[#F5F5F5] rounded-md outline-none"
                }`}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {searchKeyword && searchResults.products?.length > 0 && (
                <div className="absolute z-100 w-full">
                    <ul className="flex flex-col bg-[#D4D4D4] rounded-b-md">
                        {searchResults.products.map((result) => (
                            <li key={result.id}>
                                <Link
                                    href={`products/${result.id}`}
                                    className="flex gap-3 p-2 hover:font-bold"
                                >
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={result.thumbnail}
                                            alt={result.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p>{result.title}</p>

                                        <p className="text-sm text-gray-600">
                                            ${result.price}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;
