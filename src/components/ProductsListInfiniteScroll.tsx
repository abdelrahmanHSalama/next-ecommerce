"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { supabaseProducts } from "@/libs/axios";

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
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", selectedCategory, minPrice, maxPrice],
    queryFn: async ({ pageParam = 0 }) => {
      const limit = isFiltering ? 100 : 10;
      const offset = isFiltering ? 0 : pageParam;

      const params = new URLSearchParams();
      params.set("select", "*");
      params.set("order", "id.asc");
      params.set("limit", String(limit));
      params.set("offset", String(offset));

      if (selectedCategory !== "all") {
        params.set("category", `eq.${selectedCategory}`);
      }

      if (minPrice > 0) params.append("price", `gt.${minPrice}`);
      if (maxPrice < 10000) params.append("price", `lt.${maxPrice}`);

      const resp = await supabaseProducts.get("", { params });

      const contentRange = resp.headers["content-range"] as string | undefined;
      const total = contentRange?.includes("/")
        ? Number(contentRange.split("/")[1])
        : resp.data.length;

      return { products: resp.data as Product[], total };
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

  if (isLoading)
    return (
      <div className="w-full flex justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <p className="text-red-500">
        {error instanceof Error ? error.message : "Unknown error!"}
      </p>
    );

  const products = data?.pages.flatMap((page) => page.products) || [];

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 lg:mb-8">
          {products.map((product: Product) => (
            <ProductCard
              image={product.thumbnail}
              title={product.title}
              price={product.price}
              id={product.id}
              key={product.id}
            />
          ))}
        </div>
      ) : (
        <p>No Products Match The Selected Criteria! 😭</p>
      )}

      {hasNextPage && (
        <div className="flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 border-2 border-black lg:hover:text-white lg:hover:bg-black transition duration-250 cursor-pointer rounded-md"
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
