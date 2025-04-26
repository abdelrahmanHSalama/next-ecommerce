import HomeProductsList from "@/components/HomeProductsList";
import type { Metadata } from "next";
import Image from "next/image";
import CategoriesCarousel from "@/components/CategoriesCarousel";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Home | NextShop",
    description:
        "Shop your favorite products online with ease – discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
};

export default async function Home() {
    return (
        <>
            <div className="mb-8 w-full lg:grid lg:grid-rows-2">
                <div className="bg-[#211C24] flex flex-col lg:flex-row justify-between items-center px-4 pt-4 lg:pt-0 lg:px-32">
                    <div className="text-white flex flex-col gap-4">
                        <p className="text-[2rem]">Latest Tech Products!</p>
                        <p className="text-xl">
                            Enjoy the latest tech products with the best prices
                            on the market!
                        </p>
                        <Link
                            className="border border-white p-2 rounded-md cursor-pointer hover:bg-white hover:text-[#211C24] active:bg-white active:text-[#211C24] transition duration-250 w-max"
                            href="/products"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <div className="relative h-[250px] w-[250px] lg:h-[500px] lg:w-[500px]">
                        <Image
                            src="/phone.png"
                            fill
                            className="object-cover"
                            alt="Phone"
                        />
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2">
                    <div className="lg:grid lg:grid-rows-2">
                        <Link
                            className="flex flex-col items-center justify-center lg:text-lg p-4"
                            href="/products?category=groceries"
                        >
                            <div className="relative h-[150px] w-[150px]">
                                <Image
                                    src="/juice.png"
                                    fill
                                    className="object-cover"
                                    alt="Juice"
                                />
                            </div>
                            <p className="h-[2rem] flex items-center">
                                Fresh Groceries
                            </p>
                        </Link>
                        <div className="lg:grid lg:grid-cols-2">
                            <Link
                                className="bg-[#909090] flex flex-col items-center justify-center text-white lg:text-lg p-4"
                                href="/products?category=womens-dresses"
                            >
                                <div className="relative h-[150px] w-[150px] mb-2">
                                    <Image
                                        src="/dress.png"
                                        fill
                                        className="object-cover"
                                        alt="Dress"
                                    />
                                </div>
                                <p className="text-center">
                                    Trendy
                                    <br />
                                    Women Dresses
                                </p>
                            </Link>

                            <Link
                                className="bg-[#211C24] flex flex-col items-center justify-center text-white lg:text-lg p-4"
                                href="/products?category=mens-shirts"
                            >
                                <div className="relative h-[150px] w-[150px] mb-2">
                                    <Image
                                        src="/shirt.png"
                                        fill
                                        className="object-cover"
                                        alt="Shirt"
                                    />
                                </div>
                                <p className="text-center">
                                    Fashionable
                                    <br />
                                    Men Shirts
                                </p>
                            </Link>
                        </div>
                    </div>
                    <Link
                        className="bg-[#909090] flex flex-col lg:flex-row justify-center items-center text-white lg:text-2xl p-4"
                        href="/products?category=furniture"
                    >
                        <div className="relative h-[150px] w-[150px] lg:h-[300px] lg:w-[300px]">
                            <Image
                                src="/chair.png"
                                fill
                                className="object-cover"
                                alt="Chair"
                            />
                        </div>
                        <p className="text-center lg:text-start">
                            Elegant
                            <br />
                            Home Furniture
                        </p>
                    </Link>
                </div>
            </div>
            <div className="mx-auto w-5/6">
                <section id="categories" className="mb-8">
                    <CategoriesCarousel />
                </section>
                <section id="featured-products" className="mb-8">
                    <HomeProductsList />
                </section>
            </div>
        </>
    );
}
