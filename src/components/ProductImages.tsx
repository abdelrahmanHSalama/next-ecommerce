"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImage = {
    url: string;
    description: string;
};

export default function ProductImages({
    productImages,
}: {
    productImages: ProductImage[];
}) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-1 gap-2">
            <div className="flex flex-col gap-2 flex-1 justify-center">
                {productImages.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={image.description}
                        onClick={() => setSelectedImage(index)}
                        className={`cursor-pointer transition duration-250 ${
                            index === selectedImage
                                ? ""
                                : "grayscale opacity-50"
                        }`}
                    ></img>
                ))}
            </div>
            <div className="flex-5 relative h-[500px]">
                <Image
                    src={productImages[selectedImage].url}
                    alt={productImages[selectedImage].description}
                    fill
                    className="object-cover"
                ></Image>
            </div>
        </div>
    );
}
