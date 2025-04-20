import HomeProductsList from "@/components/HomeProductsList";
import axios from "axios";
import type { Metadata } from "next";
import Image from "next/image";
import CategoriesCarousel from "@/components/CategoriesCarousel";

export const metadata: Metadata = {
    title: "Home | Next ECommerce",
};

async function fetchProducts() {
    const { data: products } = await axios.get(
        "https://dummyjson.com/products?limit=8&skip=100"
    );
    return products.products;
}

export default async function Home() {
    const products = await fetchProducts();
    return (
        <>
            <div className="relative w-full h-[calc(100vh-72px)]">
                <Image
                    src="/banner.png"
                    alt="Banner"
                    fill
                    className="object-cover"
                />
            </div>
            {/* TODO: Revamp the Hero Section */}
            <div className="mx-auto my-4 w-5/6">
                <section id="categories" className="mb-4">
                    <CategoriesCarousel />
                </section>
                <section id="featured-products">
                    <HomeProductsList />
                </section>
            </div>
        </>
    );
}
