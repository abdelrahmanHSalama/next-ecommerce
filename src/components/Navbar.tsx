"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex gap-12">
                {navLinks.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`${
                                    isActive
                                        ? "text-black"
                                        : "text-[#989898] hover:text-black transition duration-250"
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
