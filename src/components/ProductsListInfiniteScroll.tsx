"use client";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
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

export default function ProductsListInfiniteScroll({
    limit,
    initialProducts,
    total,
}: {
    limit: number;
    initialProducts: Product[];
    total: number;
}) {
    const {
        data = initialProducts,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["products"],
        queryFn: async ({ pageParam = 0 }) => {
            const { data } = await axios.get(
                `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`
            );
            return { products: data.products, total: data.total };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce(
                (acc, page) => acc + page.products.length,
                0
            );
            return totalFetched < (total ?? 0) ? totalFetched : undefined;
        },
        initialData: initialProducts
            ? {
                  pages: [
                      {
                          products: initialProducts,
                          total: total ?? initialProducts.length,
                      },
                  ],
                  pageParams: [0],
              }
            : undefined,
        staleTime: 1000 * 60,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching products.</p>;

    const products =
        data && "pages" in data
            ? data.pages.flatMap((page) => page.products ?? [])
            : [];

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product: Product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <ProductCard
                            image={product.thumbnail}
                            title={product.title}
                            price={product.price}
                        />
                    </Link>
                ))}
            </div>

            {hasNextPage && (
                <div className="flex justify-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="p-2 border-2 border-black hover:text-white hover:bg-black transition duration-250 cursor-pointer mt-2"
                    >
                        {isFetchingNextPage ? "Loading..." : "Show More"}
                    </button>
                </div>
            )}
        </>
    );
}
