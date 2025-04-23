import React from "react";
import Link from "next/link";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = () => {
    return (
        <header className="w-full h-[80px] shadow-md flex justify-center items-center">
            <div className="w-5/6 flex items-center justify-between">
                <Link href="/">
                    <h1 className="text-2xl font-bold">NextShop</h1>
                </Link>
                <div className="flex gap-4 items-center">
                    <Navbar />
                    <Search />
                    <Auth />
                </div>
            </div>
        </header>
    );
};

export default Header;
