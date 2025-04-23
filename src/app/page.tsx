import HomeProductsList from "@/components/HomeProductsList";
import type { Metadata } from "next";
import Image from "next/image";
import CategoriesCarousel from "@/components/CategoriesCarousel";

export const metadata: Metadata = {
    title: "Home | NextShop",
    description:
        "Shop your favorite products online with ease – discover great deals, fast delivery, and a smooth, secure shopping experience all in one place.",
};

export default async function Home() {
    return (
        <>
            <div className="mb-12 w-full h-[1000px] grid grid-rows-2">
                <div className="bg-[#211C24] flex justify-between items-center px-32">
                    <div className="text-white flex flex-col gap-4">
                        <p className="text-[2rem]">Latest Tech Products!</p>
                        <p className="text-xl">
                            Enjoy the latest tech products with the best prices
                            on the market!
                        </p>
                        <button className="border border-white p-2 rounded-md cursor-pointer hover:bg-white hover:text-black transition duration-250 w-max">
                            Shop Now
                        </button>
                    </div>
                    <div className="relative h-[500px] w-[500px]">
                        <Image
                            src="/phone.png"
                            fill
                            className="object-cover"
                            alt="Phone"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="grid grid-rows-2">
                        <div className="flex justify-center items-center text-xl">
                            <div className="relative h-[150px] w-[150px]">
                                <Image
                                    src="/juice.png"
                                    fill
                                    className="object-cover"
                                    alt="Juice"
                                />
                            </div>
                            <p>Fresh Groceries</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="bg-[#909090] flex justify-center items-center text-white text-lg">
                                <div className="relative h-[150px] w-[150px]">
                                    <Image
                                        src="/dress.png"
                                        fill
                                        className="object-cover"
                                        alt="Dress"
                                    />
                                </div>
                                <p>
                                    Trendy
                                    <br />
                                    Women Dresses
                                </p>
                            </div>
                            <div className="bg-[#211C24] flex justify-center items-center text-white text-lg">
                                <div className="relative h-[150px] w-[150px]">
                                    <Image
                                        src="/shoes.png"
                                        fill
                                        className="object-cover"
                                        alt="Shoes"
                                    />
                                </div>
                                <p>
                                    Fashionable
                                    <br />
                                    Men Shoes
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#909090] flex justify-center items-center text-white text-2xl">
                        <div className="relative h-[300px] w-[300px]">
                            <Image
                                src="/chair.png"
                                fill
                                className="object-cover"
                                alt="Chair"
                            />
                        </div>
                        <p>Elegant Home Furniture</p>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-5/6">
                <section id="categories" className="mb-12">
                    <CategoriesCarousel />
                </section>
                <section id="featured-products" className="mb-12">
                    <HomeProductsList />
                </section>
            </div>
        </>
    );
}
