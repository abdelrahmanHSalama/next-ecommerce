import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";

type ProductProps = {
    image: string;
    title: string;
    price: number;
};

const ProductCard = ({ image, title, price }: ProductProps) => {
    return (
        <div className="bg-[#F6F6F6] p-4 rounded-md flex flex-col gap-2 h-full">
            <img
                src={image}
                alt={title}
                className="w-full h-40 object-contain"
            />
            <h3 className="font-semibold text-center h-full flex justify-center items-center">
                {title}
            </h3>
            <p className="font-bold text-center">${price}</p>
            <div className="flex justify-between w-3/4 mx-auto gap-2">
                <WishlistButton style="mini" />
                <CartButton className="flex-1" />
            </div>
        </div>
    );
};

export default ProductCard;
