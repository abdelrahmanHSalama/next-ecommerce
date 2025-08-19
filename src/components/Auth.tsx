"use client";

// import { useCartStore } from "@/store/cartStore";
// import { useWishlistStore } from "@/store/wishlistStore";
import { useState } from "react";
// import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { Icon } from "@iconify/react";

const Auth = ({
  setHamburgerMenu,
}: {
  setHamburgerMenu?: (hamburgerMenu: boolean) => void;
}) => {
  //   const { data: session } = useSession();
  //   const clearCart = useCartStore((state) => state.clearCart);
  //   const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const [dropdown, setDropdown] = useState(false);
  //   const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleAccountClick = () => {
    router.push("/account");
    setDropdown(false);
    setHamburgerMenu?.(false);
  };

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         dropdownRef.current &&
  //         !dropdownRef.current.contains(event.target as Node)
  //       ) {
  //         setDropdown(false);
  //       }
  //     };

  //     if (dropdown) {
  //       document.addEventListener("mousedown", handleClickOutside);
  //     }

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [dropdown]);

  //   const handleSignout = () => {
  //     setHamburgerMenu?.(false);
  //     clearCart();
  //     clearWishlist();
  //     signOut();
  //   };

  //   if (session) {
  //     return (
  //       <div className="relative" ref={dropdownRef}>
  //         <button
  //           className={`p-2 cursor-pointer flex items-center w-full ${
  //             dropdown
  //               ? "bg-[#D4D4D4] rounded-t-md"
  //               : "rounded-md lg:hover:bg-[#F5F5F5]"
  //           }`}
  //           onClick={() => setDropdown(!dropdown)}
  //         >
  //           <Image
  //             src={session.user?.image || "/avatar.png"}
  //             width={40}
  //             height={40}
  //             className="aspect-auto rounded-full object-cover"
  //             alt={`${session.user?.name}'s Image`}
  //           ></Image>
  //           <p className="p-2">{session.user?.name}</p>
  //         </button>
  //         {dropdown && (
  //           <div className="w-full lg:absolute lg:z-100">
  //             <ul className="flex flex-col bg-[#D4D4D4] rounded-b-md">
  //               <li
  //                 className="p-2 cursor-pointer lg:hover:font-bold"
  //                 onClick={handleAccountClick}
  //               >
  //                 Account
  //               </li>
  //               <li
  //                 className="p-2 cursor-pointer rounded-b-md lg:hover:font-bold"
  //                 onClick={handleSignout}
  //               >
  //                 Signout
  //               </li>
  //             </ul>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   }

  return (
    <button className="p-2 rounded-md lg:hover:bg-[#F5F5F5] transition duration-250 cursor-pointer flex gap-2">
      <Icon icon="lucide:user" width="20" height="20" /> Signin
    </button>
  );
};

export default Auth;
