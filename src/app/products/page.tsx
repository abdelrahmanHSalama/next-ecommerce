import ProductsListInfiniteScroll from "@/components/ProductsListInfiniteScroll";
import axios from "axios";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products | Next ECommerce",
};

async function fetchProducts() {
    const { data } = await axios.get("https://dummyjson.com/products?limit=20");
    return data;
}

export default async function Products() {
    const data = await fetchProducts();

    return (
        <>
            <div className="mx-auto my-4 w-5/6">
                <ProductsListInfiniteScroll
                    initialProducts={data.products}
                    limit={20}
                    total={data.total}
                />
            </div>
        </>
    );
}
