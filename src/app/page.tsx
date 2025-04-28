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
            <div className="mb-8 w-full lg:grid lg:grid-rows-2 lg:h-[calc(100vh-80px)]">
                <div className="bg-[#211C24] flex flex-col lg:flex-row justify-between items-center px-8 pt-8 lg:pt-0 lg:px-32 lg:relative">
                    <div className="text-white flex flex-col gap-4">
                        <p className="text-[2rem]">Shop Latest Products!</p>
                        <p className="text-xl">
                            Enjoy the latest products with the best prices on
                            the market!
                        </p>
                        <Link
                            className="border border-white p-2 rounded-md cursor-pointer lg:hover:bg-white lg:hover:text-[#211C24] active:bg-white active:text-[#211C24] transition duration-250 w-max"
                            href="/products"
                        >
                            Shop Now
                        </Link>
                    </div>
                    <div className="relative lg:absolute h-[250px] w-[250px] lg:bottom-0 lg:right-0 lg:mr-32">
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
                            className="flex flex-col lg:flex-row items-center justify-center lg:text-lg"
                            href="/products?category=groceries"
                        >
                            <div className="relative h-[100px] w-[100px]">
                                <Image
                                    src="/juice.png"
                                    fill
                                    className="object-cover"
                                    alt="Juice"
                                />
                            </div>
                            <p className="flex items-center">Fresh Groceries</p>
                        </Link>
                        <div className="lg:grid lg:grid-cols-2">
                            <Link
                                className="bg-[#909090] flex flex-col lg:flex-row items-center justify-center text-white lg:text-lg"
                                href="/products?category=womens-dresses"
                            >
                                <div className="relative h-[100px] w-[100px] mb-2">
                                    <Image
                                        src="/dress.png"
                                        fill
                                        className="object-cover"
                                        alt="Dress"
                                    />
                                </div>
                                <p className="text-center lg:text-start">
                                    Trendy
                                    <span className="inline lg:hidden"> </span>
                                    <span className="hidden lg:inline">
                                        <br />
                                    </span>
                                    Women Dresses
                                </p>
                            </Link>

                            <Link
                                className="bg-[#211C24] flex flex-col lg:flex-row items-center justify-center text-white lg:text-lg"
                                href="/products?category=mens-shirts"
                            >
                                <div className="relative h-[100px] w-[100px] mb-2">
                                    <Image
                                        src="/shirt.png"
                                        fill
                                        className="object-cover"
                                        alt="Shirt"
                                    />
                                </div>
                                <p className="text-center lg:text-start">
                                    Fashionable
                                    <span className="inline lg:hidden"> </span>
                                    <span className="hidden lg:inline">
                                        <br />
                                    </span>
                                    Men Shirts
                                </p>
                            </Link>
                        </div>
                    </div>
                    <Link
                        className="bg-[#909090] flex flex-col lg:flex-row justify-center items-center text-white lg:text-xl"
                        href="/products?category=furniture"
                    >
                        <div className="relative h-[250px] w-[250px]">
                            <Image
                                src="/chair.png"
                                fill
                                className="object-cover"
                                alt="Chair"
                            />
                        </div>
                        <p className="text-center lg:text-start">
                            Elegant
                            <span className="inline lg:hidden"> </span>
                            <span className="hidden lg:inline">
                                <br />
                            </span>
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
