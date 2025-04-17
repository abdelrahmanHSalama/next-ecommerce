"use client";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    thumbnail: string;
}

export default function ProductsListInfiniteScroll({
    selectedCategory,
    minPrice,
    maxPrice,
}: {
    selectedCategory: string;
    minPrice: number;
    maxPrice: number;
}) {
    const isFiltering = minPrice !== 0 || maxPrice !== 10000;

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["products", selectedCategory, minPrice, maxPrice],
        queryFn: async ({ pageParam = 0 }) => {
            const apiLink =
                selectedCategory === "all"
                    ? isFiltering
                        ? `https://dummyjson.com/products?limit=100`
                        : `https://dummyjson.com/products?limit=15&skip=${pageParam}`
                    : `https://dummyjson.com/products/category/${selectedCategory}`;
            const { data } = await axios.get(apiLink);
            return { products: data.products, total: data.total };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce(
                (sum, page) => sum + page.products.length,
                0
            );
            return totalFetched < lastPage.total ? totalFetched : undefined;
        },
        staleTime: 1000 * 60,
    });

    if (isLoading) return <p>Loading Products...</p>;
    if (isError) return <p>Error Fetching Products...</p>;

    const products = data?.pages.flatMap((page) => page.products) || [];

    const filteredProducts = products.filter(
        (product) => product.price > minPrice && product.price < maxPrice
    );

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product: Product) => (
                    <ProductCard
                        image={product.thumbnail}
                        title={product.title}
                        price={product.price}
                        id={product.id}
                        key={product.id}
                    />
                ))}
            </div>

            {isFiltering
                ? ""
                : hasNextPage && (
                      <div className="flex justify-center">
                          <button
                              onClick={() => fetchNextPage()}
                              disabled={isFetchingNextPage}
                              className="p-2 border-2 border-black hover:text-white hover:bg-black transition duration-250 cursor-pointer mt-4 rounded-md"
                          >
                              {isFetchingNextPage ? (
                                  <div className="loader w-4 h-4 border-[#989898]"></div>
                              ) : (
                                  "Show More"
                              )}
                          </button>
                      </div>
                  )}
        </>
    );
}
