import React from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { Icon } from "@iconify/react";
import AuthButton from "./AuthButton";

const Header = () => {
    return (
        <header className="py-4 w-5/6 flex mx-auto items-center justify-between">
            <Link href="/">
                <h1 className="text-2xl font-bold">ECommerce</h1>
            </Link>
            <Navbar />
            <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#989898]">
                    <Icon icon="lucide:search" width="20" height="20" />
                </span>
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded-md p-2 pl-9 bg-[#F5F5F5] w-64"
                />
            </div>
            <div className="flex gap-2 items-center">
                <Link
                    href="/wishlist"
                    className="flex items-center gap-2 hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
                >
                    <Icon icon="lucide:heart" width="20" height="20" /> Wishlist
                </Link>
                <Link
                    href="/cart"
                    className="flex items-center gap-2 hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
                >
                    <Icon icon="lucide:shopping-cart" width="20" height="20" />{" "}
                    Cart
                </Link>
                <AuthButton />
            </div>
        </header>
    );
};

export default Header;
