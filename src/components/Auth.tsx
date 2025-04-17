"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Auth = () => {
    const { data: session } = useSession();
    const clearCart = useCartStore((state) => state.clearCart);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);

    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdown(false);
            }
        };

        if (dropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);

    const handleSignout = () => {
        clearCart();
        clearWishlist();
        signOut();
    };

    console.log(session);

    if (session) {
        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    className="p-2 rounded-md hover:bg-[#F5F5F5] transition duration-250 cursor-pointer flex items-center"
                    onClick={() => setDropdown(!dropdown)}
                >
                    <Image
                        src={session.user?.image}
                        width={40}
                        height={40}
                        className="aspect-auto rounded-full object-cover"
                        alt={`${session.user?.name}'s Image`}
                    ></Image>
                    <p className="p-2">{session.user?.name}</p>
                </button>
                {dropdown && (
                    <div className="absolute z-100">
                        <ul className="flex flex-col bg-[#F5F5F5] rounded-md">
                            <li
                                className="p-2 cursor-pointer hover:bg-[#D4D4D4] rounded-t-md"
                                onClick={() => router.push("/")}
                            >
                                Account Settings
                            </li>
                            <div className="bg-[#D4D4D4] h-0.25"></div>
                            <li
                                className="p-2 cursor-pointer hover:bg-[#D4D4D4] rounded-b-md"
                                onClick={handleSignout}
                            >
                                Signout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        );
    }

    return (
        <button
            className="p-2 rounded-md hover:bg-[#F5F5F5] transition duration-250 cursor-pointer"
            onClick={() => signIn("google")}
        >
            Signin
        </button>
    );
};

export default Auth;
