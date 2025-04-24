"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
}

const searchProducts = async (
  searchParameters: string
): Promise<SearchResponse> => {
  const { data: searchResults } = await axios.get<SearchResponse>(
    `https://dummyjson.com/products/search?q=${searchParameters}`
  );
  return searchResults;
};

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResponse>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const [dropdown, setDropdown] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const handleCloseDropdown = () => {
    setDropdown(false);
    setSearchKeyword("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        handleCloseDropdown();
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearchKeyword.trim()) {
        return;
      }
      const fetchedProducts = await searchProducts(debouncedSearchKeyword);
      setSearchResults(fetchedProducts);
    };

    fetchResults();
  }, [debouncedSearchKeyword]);

  return (
    <div
      ref={searchDropdownRef}
      className={`relative ${
        searchKeyword ? "bg-[#D4D4D4] rounded-t-md" : "bg-[#F5F5F5] rounded-md"
      }`}
    >
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <Icon icon="lucide:search" width="20" height="20" />
      </span>
      {searchKeyword && (
        <span
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handleCloseDropdown}
        >
          <Icon icon="lucide:x" width="20" height="20" />
        </span>
      )}
      <input
        type="text"
        placeholder="Search"
        className={`rounded-md p-2 pl-9 w-64 ${
          searchKeyword
            ? "bg-[#D4D4D4] rounded-t-md outline-none"
            : "bg-[#F5F5F5] rounded-md outline-none"
        }`}
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          setDropdown(true);
        }}
      />
      {searchKeyword && searchResults?.products.length > 0 && (
        <div className="absolute z-100 w-full">
          <ul className="flex flex-col bg-[#D4D4D4] rounded-b-md">
            {searchResults?.products.slice(0, 3).map((result) => (
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

                    <p className="text-sm text-gray-600">${result.price}</p>
                  </div>
                </Link>
              </li>
            ))}
            {searchResults.products.length > 3 && (
              <Link
                className="text-blue-800 p-4 hover:font-bold cursor-pointer"
                href={`/search?q=${debouncedSearchKeyword}`}
                onClick={handleCloseDropdown}
              >
                Show More Results...
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
