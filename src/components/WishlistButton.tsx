const WishlistButton = ({ className }: { className?: string }) => {
  return (
    <button
      className={`bg-white border-2 border-black rounded-md p-2 hover:cursor-pointer hover:bg-black hover:text-white transition duration-250 ${className}`}
    >
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;
