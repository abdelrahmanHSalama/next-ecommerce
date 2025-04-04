import React from "react";

const CartButton = ({ className }: { className?: string }) => {
  return (
    <button
      className={`text-white bg-black border-2 border-black rounded-md p-2 hover:cursor-pointer hover:text-black hover:bg-white transition duration-250 ${className}`}
    >
      Add to Cart
    </button>
  );
};

export default CartButton;
