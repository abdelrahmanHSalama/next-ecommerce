"use client";

import { useState } from "react";
import Link from "next/link";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = () => {
    const [hamburgerMenu, setHamburgerMenu] = useState(true);
    return (
        <header className="w-full shadow-md flex flex-col lg:h-[80px] lg:flex-row lg:items-center">
            <div className="lg:hidden w-full px-4 py-8 flex justify-between items-center mx-auto">
                <Link href="/">
                    <h1 className="text-2xl font-bold">NextShop</h1>
                </Link>
                <button
                    className="text-2xl font-bold"
                    aria-label={hamburgerMenu ? "Close menu" : "Open menu"}
                    onClick={() => setHamburgerMenu(!hamburgerMenu)}
                >
                    {hamburgerMenu ? "X" : "☰"}
                </button>
            </div>

            {hamburgerMenu && (
                <div className="lg:hidden flex flex-col gap-2 px-4 pb-2">
                    <Navbar version="small" />
                    <Search />
                    <Auth />
                </div>
            )}

            <div className="hidden lg:flex w-5/6 items-center justify-between mx-auto">
                <Link href="/">
                    <h1 className="text-2xl font-bold">NextShop</h1>
                </Link>

                <div className="hidden lg:flex gap-4 items-center">
                    <Navbar version="full" />
                    <Search />
                    <Auth />
                </div>
            </div>
        </header>
    );
};

export default Header;
