import React from "react";
import Link from "next/link";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = () => {
    return (
        <div className="shadow-md">
            <header className="py-2 w-5/6 flex mx-auto items-center justify-between h-[72px]">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Next:ECommerce</h1>
                </Link>
                <div className="flex gap-2 items-center">
                    <Navbar />
                    <Search />
                    <Auth />
                </div>
            </header>
        </div>
    );
};

export default Header;
