import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Auth from "./Auth";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <div className="shadow-md">
            <header className="py-2 w-5/6 flex mx-auto items-center justify-between h-[72px]">
                <Link href="/">
                    <h1 className="text-2xl font-bold">ECommerce</h1>
                </Link>
                <div className="flex gap-2 items-center">
                    <Navbar />
                    <div className="relative border rounded-md">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                            <Icon icon="lucide:search" width="20" height="20" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="rounded-md p-2 pl-9 w-64"
                        />
                    </div>
                    <Auth />
                </div>
            </header>
        </div>
    );
};

export default Header;
