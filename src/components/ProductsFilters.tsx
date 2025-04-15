"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const fetchCategories = async () => {
    const { data: categories } = await axios.get(
        "https://dummyjson.com/products/categories"
    );
    return categories;
};

const ProductsFilters = ({ selectedCategory, setSelectedCategory }) => {
    const [categories, setCategories] = useState([
        {
            slug: "all",
            name: "All",
            url: "https://dummyjson.com/products?limit=15",
        },
    ]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories([...categories, ...fetchedCategories]);
            setIsLoading(false);
        };

        getCategories();
    }, []);

    if (isLoading) {
        return <p>Loading Categories...</p>;
    }

    return (
        <div>
            <p className="font-bold text-lg mb-1">Filter Products</p>
            <p className="font-bold mb-1">Categories</p>
            <ul className="list-none">
                {categories.map((category, i) => (
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
                ))}
            </ul>
        </div>
    );
};

export default ProductsFilters;
