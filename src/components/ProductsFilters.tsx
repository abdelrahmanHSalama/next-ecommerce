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
    <div>
      <button
        className="lg:hidden mb-4 w-full border px-4 py-2 rounded-md cursor-pointer transition duration-250 flex items-center justify-between"
        onClick={handleFiltersOpen}
        aria-expanded={filtersOpen}
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          <Icon icon="lucide:filter" width="16" height="16" />
          Filter Products
        </span>
        <Icon
          icon="lucide:chevron-down"
          width="18"
          height="18"
          className={`${
            filtersOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-250`}
        />
      </button>

      <div className="hidden lg:flex flex-col gap-1 mb-2">
        <p className="text-xl font-semibold">Filter Products</p>
      </div>

      <div
        className={`overflow-hidden lg:overflow-visible lg:block transition-all duration-250 ease-in-out ${
          filtersOpen ? "max-h-[1200px]" : "max-h-0"
        }`}
      >
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-base lg:text-lg font-medium">Categories</p>
            <button
              onClick={handleFold}
              className="text-sm flex items-center gap-1 cursor-pointer lg:hover:font-semibold"
            >
              {folded ? (
                <>
                  <Icon icon="lucide:circle-plus" width="16" height="16" />
                  Show All
                </>
              ) : (
                <>
                  <Icon icon="lucide:circle-minus" width="16" height="16" />
                  Show Less
                </>
              )}
            </button>
          </div>

          {isLoading ? (
            <div className="w-full flex justify-center py-6">
              <Loading />
            </div>
          ) : (
            <ul className="mt-2 grid grid-cols-1 gap-1">
              {(folded ? categories.slice(0, 6) : categories).map(
                (category, i) => (
                  <li key={i} className="">
                    <label className="cursor-pointer inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.slug}
                        onChange={() => handleChangeCategory(category.slug)}
                        className="peer appearance-none border-2 border-black rounded-full w-4 h-4 checked:bg-black cursor-pointer"
                      />
                      <span className="text-sm lg:text-base peer-checked:font-semibold">
                        {category.name}
                      </span>
                    </label>
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-2">
          <p className="text-base lg:text-lg font-medium mb-2">Price Range</p>
          <div className="grid grid-cols-2 gap-2 mb-3 w-full max-w-xs">
            <input
              type="number"
              inputMode="numeric"
              placeholder="Min"
              className="border px-3 py-2 rounded-md text-sm"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
            />
            <input
              type="number"
              inputMode="numeric"
              placeholder="Max"
              className="border px-3 py-2 rounded-md text-sm"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-2 rounded-md border bg-black text-white lg:hover:opacity-90 transition duration-250 text-sm"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="px-3 py-2 rounded-md border bg-white text-black lg:hover:bg-black lg:hover:text-white transition duration-250 text-sm"
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
