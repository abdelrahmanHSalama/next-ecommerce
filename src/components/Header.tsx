import React from "react";
import Link from "next/link";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = () => {
    return (
        <header className="w-full h-[80px] shadow-md flex justify-between lg:justify-center items-center">
            <div className="lg:hidden absolute z-10 w-5/6 right-0 top-0 h-screen bg-white flex flex-col">
                <button className="text-2xl font-bold ml-auto p-4">X</button>
                <Navbar version="small" />
                <Search />
                <Auth />
            </div>
            <div className="w-5/6 flex items-center justify-between mx-auto">
                <Link href="/">
                    <h1 className="text-2xl font-bold">NextShop</h1>
                </Link>

                <div className="hidden lg:flex gap-4 items-center">
                    <Navbar version="full" />
                    <Search />
                    <Auth />
                </div>

                <div className="lg:hidden flex items-center">
                    <button className="text-2xl font-bold">☰</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
