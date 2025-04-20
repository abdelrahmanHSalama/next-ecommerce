"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const fetchCategories = async () => {
    const { data: categories } = await axios.get(
        "https://dummyjson.com/products/categories"
    );
    return categories;
};

const ProductsFilters = ({
    selectedCategory,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
}) => {
    const [categories, setCategories] = useState([
        {
            slug: "all",
            name: "All",
            url: "https://dummyjson.com/products?limit=15",
        },
    ]);

    const [isLoading, setIsLoading] = useState(true);
    const [folded, setFolded] = useState(true);

    const handleFold = () => {
        setFolded(!folded);
    };

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories([...categories, ...fetchedCategories]);
            setIsLoading(false);
        };

        getCategories();
    }, []);

    const [tempMinPrice, setTempMinPrice] = useState("");
    const [tempMaxPrice, setTempMaxPrice] = useState("");

    const applyFilters = () => {
        setMinPrice(Number(tempMinPrice) || 0);
        setMaxPrice(Number(tempMaxPrice) || 10000);
    };

    const clearFilters = () => {
        setMinPrice(0);
        setMaxPrice(10000);
        setTempMinPrice("");
        setTempMaxPrice("");
    };

    if (isLoading) {
        return <p>Loading Categories...</p>;
    }

    return (
        <div>
            <p className="font-bold text-lg mb-2">Filter Products</p>
            <p className="font-bold mb-0.5">Categories</p>
            <ul className="list-none mb-2">
                {(folded ? categories.slice(0, 6) : categories).map(
                    (category, i) => (
                        <li key={i} className="mb-0.5">
                            <label className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === category.slug}
                                    onChange={() =>
                                        setSelectedCategory(category.slug)
                                    }
                                ></input>{" "}
                                {category.name}
                            </label>
                        </li>
                    )
                )}
                <div
                    onClick={handleFold}
                    className="cursor-pointer hover:font-bold inline"
                >
                    {folded ? (
                        <p className="flex gap-1">
                            <Icon
                                icon="lucide:arrow-down"
                                width="20"
                                height="20"
                            />{" "}
                            Show All Categories
                        </p>
                    ) : (
                        <p className="flex gap-1">
                            <Icon
                                icon="lucide:arrow-up"
                                width="20"
                                height="20"
                            />{" "}
                            Show Less Categories
                        </p>
                    )}
                </div>
            </ul>
            <div className="flex flex-col">
                <p className="font-bold mb-1">Price Range</p>
                <input
                    type="text"
                    placeholder="Min Price"
                    className="border p-1 rounded-md mb-1 w-max"
                    value={tempMinPrice}
                    onChange={(e) => setTempMinPrice(e.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Max Price"
                    className="border p-1 rounded-md mb-1 w-max"
                    value={tempMaxPrice}
                    onChange={(e) => setTempMaxPrice(e.target.value)}
                ></input>
                <button
                    className="border hover:bg-black hover:text-white p-1 rounded-md cursor-pointer w-max mb-1"
                    onClick={applyFilters}
                >
                    Apply Filters
                </button>
                <button
                    className="border hover:bg-black hover:text-white p-1 rounded-md cursor-pointer w-max mb-1"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default ProductsFilters;
