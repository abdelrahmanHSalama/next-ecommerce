"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex gap-2">
                {navLinks.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${
                                    isActive
                                        ? "text-black hover:bg-[#F5F5F5] transition duration-250 cursor-pointer p-2 rounded-md"
                                        : "text-[#989898] hover:text-black transition duration-250 hover:bg-[#F5F5F5] cursor-pointer p-2 rounded-md"
                                }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
