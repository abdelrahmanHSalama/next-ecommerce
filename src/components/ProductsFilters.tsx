"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Icon } from "@iconify/react";

interface ProductsFilterProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

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
}: ProductsFilterProps) => {
  const [categories, setCategories] = useState([
    {
      slug: "all",
      name: "All",
      url: "https://dummyjson.com/products?limit=15",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [folded, setFolded] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleFold = () => {
    setFolded(!folded);
  };

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories((prev) => [...prev, ...fetchedCategories]);
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

  const handleFiltersOpen = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    clearFilters();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
      <button
        className="inline-flex items-center gap-2 w-full justify-center bg-gray-50 hover:bg-gray-900 hover:text-white border border-gray-200 px-4 py-3 rounded-lg font-medium transition-all duration-200 lg:hidden mb-4 cursor-pointer"
        onClick={handleFiltersOpen}
      >
        <Icon icon="lucide:filter" width="18" height="18" />
        Filter Products
      </button>
      <div className="hidden lg:block">
        <h2 className="text-2xl font-bold">Filters</h2>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:max-h-none lg:opacity-100 ${
          filtersOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isLoading ? (
          <div className="w-full flex justify-center py-8">
            <Loading />
          </div>
        ) : (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <ul
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: folded ? "216px" : "1000px",
              }}
            >
              {categories.map((category, i) => (
                <li
                  key={i}
                  className={`transition-opacity duration-300 ${
                    folded && i >= 6 ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <label className="group cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.slug}
                      onChange={() => handleChangeCategory(category.slug)}
                      className="w-4 h-4 border-2 border-gray-300 rounded-full checked:bg-gray-900 checked:border-gray-900"
                    />
                    <span className="text-sm font-medium capitalize">
                      {category.name}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleFold}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
            >
              {folded ? (
                <div className="cursor-pointer flex gap-1 items-center">
                  <Icon icon="lucide:plus" width="16" height="16" />
                  Show All Categories
                </div>
              ) : (
                <div className="cursor-pointer flex gap-1 items-center">
                  <Icon icon="lucide:minus" width="16" height="16" />
                  Show Less Categories
                </div>
              )}
            </button>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Min Price ($)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-500"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Max Price ($)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-500"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 bg-black text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 cursor-pointer"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
            <button
              className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
