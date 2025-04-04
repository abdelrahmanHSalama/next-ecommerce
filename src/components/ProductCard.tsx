import CartButton from "./CartButton";

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
            <CartButton />
        </div>
    );
};

export default ProductCard;
