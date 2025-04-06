import { Icon } from "@iconify/react";

const WishlistButton = ({
    className,
    style,
}: {
    className?: string;
    style: string;
}) => {
    return (
        <button
            className={`bg-white border-2 border-black rounded-md p-2 hover:cursor-pointer hover:bg-black hover:text-white transition duration-250 ${className}`}
        >
            {style === "full" ? (
                "Add to Wishlist"
            ) : (
                <Icon icon="lucide:shopping-cart" width="24" height="24" />
            )}
        </button>
    );
};

export default WishlistButton;
