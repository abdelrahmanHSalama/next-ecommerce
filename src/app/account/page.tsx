"use client";

import React from "react";
import Image from "next/image";

const Account = () => {
  if (session) {
    return (
      <div className="mx-auto my-4 w-5/6">
        <h2 className="mb-2 text-xl font-bold">Account</h2>
        <div className="flex items-center gap-2">
          <Image
            src={session.user?.image || "/avatar.png"}
            width={100}
            height={100}
            className="aspect-auto rounded-full object-cover"
            alt={`${session.user?.name}'s Image`}
          ></Image>
          <div>
            <p className="text-xl font-bold">{session.user?.name}</p>
            <p>{session.user?.email}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="py-4 w-5/6 flex mx-auto justify-center items-center flex-grow">
        <button
          className="text-white bg-black border-2 border-black rounded-md py-2 px-4 lg:hover:text-black lg:hover:bg-white transition duration-250 cursor-pointer"
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </button>
      </div>
    );
  }
};

export default Account;
