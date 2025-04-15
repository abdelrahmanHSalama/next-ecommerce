import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";
import Link from "next/link";
import Image from "next/image";

type ProductProps = {
    image: string;
    title: string;
    price: number;
    id: number;
};

const ProductCard = ({ image, title, price, id }: ProductProps) => {
    return (
        <div className="bg-[#F6F6F6] p-4 rounded-md flex flex-col gap-4">
            <Link href={`products/${id}`} className="flex flex-col gap-2">
                <Image
                    src={image}
                    alt={title}
                    width={180}
                    height={180}
                    className="mx-auto"
                ></Image>
                <h3 className="font-semibold text-center flex justify-center items-center">
                    {title}
                </h3>
                <p className="font-bold text-center">${price}</p>
            </Link>
            <div className="flex justify-between mx-auto gap-2">
                <WishlistButton style="mini" productId={id} />
                <CartButton className="min-content" productId={id} />
            </div>
        </div>
    );
};

export default ProductCard;
