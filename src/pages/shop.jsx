import React, { useState, useEffect, useRef } from "react";
import productsData from "../db.json";
import ProductCard from "../components/UI/productCard";
import { useMediaQuery } from "react-responsive";

// Mobile-only horizontal CategoryBar
function CategoryBar({ selectedCategory, onSelectCategory }) {
  const categories = [
    { value: "all", label: "All" },
    { value: "hoodies", label: "Hoodies" },
    { value: "tshirts", label: "T-Shirts" },
    { value: "pants", label: "Pants" },
    { value: "jackets", label: "Jackets" },
  ];

  return (
    <div className="fixed z-10 top-[48px] left-0 w-full overflow-x-auto">
      <div className="flex flex-nowrap items-center gap-2 px-2 py-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className={`mx-1 py-1 px-3 text-sm font-semibold rounded-md text-black dark:text-white hover:underline whitespace-nowrap ${
              cat.value === selectedCategory
                ? "bg-gray-500 dark:bg-gray-600 text-white"
                : "bg-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const Shop = () => {
  const [products, setProducts] = useState(productsData.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("price-low");

  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const productsRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const categories = [
    { value: "all", label: "All" },
    { value: "hoodies", label: "Hoodies" },
    { value: "tshirts", label: "T-Shirts" },
    { value: "pants", label: "Pants" },
    { value: "jackets", label: "Jackets" },
  ];

  const priceRanges = [
    { value: "0-50", label: "Under ksh 50" },
    { value: "50-100", label: "ksh 50 - ksh 100" },
    { value: "100-150", label: "ksh 100 - ksh 150" },
    { value: "150+", label: "Over ksh 150" },
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["black", "white", "gray", "red", "blue", "green", "navy"];

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    let filtered = [...productsData.products];

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      filtered = filtered.filter((p) =>
        selectedCategories.some((cat) => p.category.includes(cat))
      );
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedPriceRanges.some((range) => {
          if (range.includes("+")) {
            const min = parseFloat(range.replace("+", ""));
            return p.price >= min;
          } else {
            const [min, max] = range.split("-").map(Number);
            return p.price >= min && p.price <= max;
          }
        });
      });
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (p) => p.sizes && selectedSizes.some((size) => p.sizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter(
        (p) =>
          p.colors && selectedColors.some((color) => p.colors.includes(color))
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setProducts(filtered);
  }, [
    searchQuery,
    selectedCategories,
    selectedPriceRanges,
    selectedSizes,
    selectedColors,
    sortBy,
  ]);

  const handleCategoryChange = (value) => {
    if (isMobile) {
      if (value === "all") {
        setSelectedCategories(["all"]);
      } else {
        setSelectedCategories([value]);
      }
    } else {
      if (value === "all") {
        setSelectedCategories(["all"]);
      } else {
        setSelectedCategories((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev.filter((v) => v !== "all"), value]
        );
      }
    }
    scrollToProducts();
  };

  const handlePriceChange = (value) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    scrollToProducts();
  };

  const handleSizeChange = (value) => {
    setSelectedSizes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    scrollToProducts();
  };

  const handleColorChange = (value) => {
    setSelectedColors((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    scrollToProducts();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories(["all"]);
    setSelectedPriceRanges([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy("price-low");
    scrollToProducts();
  };

  return (
    <div>
      {isMobile && (
        <>
          <CategoryBar
            selectedCategory={selectedCategories[0] || "all"}
            onSelectCategory={handleCategoryChange}
          />

          {/* Show Filters button at top-left */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="fixed top-24 left-2 z-50 bg-gray-200 dark:bg-opacity-50 rounded p-1 flex flex-col items-center shadow"
          >
            <img
              src="/icons/filter.png"
              alt="Filter Icon"
              className="w-6 h-6"
            />
            <span className="text-xs font-semibold text-black">
              Show Filters
            </span>
          </button>
        </>
      )}

      <div className="min-h-screen pt-24 md:pt-[70px] pb-10 px-5">
        {isMobile && (
          <div className="flex justify-end mb-2">
            <select
              className="p-2 border border-gray-400 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                scrollToProducts();
              }}
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        )}

        {isMobile && showMobileFilters && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowMobileFilters(false)}
            ></div>

            
            <div className="fixed inset-y-0 left-0 bg-white dark:bg-black w-3/4 max-w-xs h-full shadow-lg overflow-y-auto p-5 z-50">

              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl text-black dark:text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border border-gray-400 dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-700 text-black dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Category */}
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Category
                  <span>{isCategoryOpen ? "▲" : "▼"}</span>
                </button>
                {isCategoryOpen && (
                  <div className="mt-2 space-y-2">
                    {categories.map((c) => (
                      <label key={c.value} className="flex items-center gap-2 text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(c.value)}
                          onChange={() => handleCategoryChange(c.value)}
                        />
                        {c.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                >
                  Price Range
                  <span>{isPriceOpen ? "▲" : "▼"}</span>
                </button>
                {isPriceOpen && (
                  <div className="mt-2 space-y-2">
                    {priceRanges.map((p) => (
                      <label key={p.value} className="flex items-center gap-2 text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(p.value)}
                          onChange={() => handlePriceChange(p.value)}
                        />
                        {p.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                  onClick={() => setIsSizeOpen(!isSizeOpen)}
                >
                  Size
                  <span>{isSizeOpen ? "▲" : "▼"}</span>
                </button>
                {isSizeOpen && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <label key={size} className="flex items-center gap-2 text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Colors */}
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                  onClick={() => setIsColorOpen(!isColorOpen)}
                >
                  Color
                  <span>{isColorOpen ? "▲" : "▼"}</span>
                </button>
                {isColorOpen && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <label key={color} className="flex items-center gap-2 text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => handleColorChange(color)}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-gray-400 dark:border-gray-500"
                          style={{ backgroundColor: color }}
                        ></span>
                        {color}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Clear All Filters
              </button>
            </div>
                {/* Floating Close Button */}
    <button
      onClick={() => setShowMobileFilters(false)}
              className="fixed top-80 left-[calc(75%+0.5rem)] w-12 h-12 flex items-center justify-center rounded-full transition z-50 font-bold bg-white dark:bg-gray-700 dark:text-white"
    >
                      <svg
                  className="me-1.5 h-8 w-8"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#E02424"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
    </button>
          </>
        )}

        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* Filters */}
          {(!isMobile || showMobileFilters) && (
            <div className="w-full lg:w-1/4 bg-white dark:bg-black p-5 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl text-black dark:text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 text-gray-500 dark:text-gray-300 border-gray-400 dark:border-gray-600 border rounded mb-4 bg-white dark:bg-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Category filters — only show on desktop */}
              {!isMobile && (
                <div className="mb-4">
                  <button
                    className="w-full flex justify-between items-center font-medium p-2 bg-gray-200 dark:bg-gray-600 hover:bg-[#EEC5A2] dark:hover:bg-gray-500 text-black dark:text-white"
                    onClick={() => setIsCategoryOpen((prev) => !prev)}
                  >
                    Category
                    <span>{isCategoryOpen ? "▲" : "▼"}</span>
                  </button>
                  {isCategoryOpen && (
                    <div className="mt-2 space-y-2">
                      {categories.map((c) => (
                        <label
                          key={c.value}
                          className="flex items-center gap-2 text-black dark:text-white"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(c.value)}
                            onChange={() => handleCategoryChange(c.value)}
                          />
                          {c.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Price Range */}
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center font-medium p-2 bg-gray-200 hover:bg-[#EEC5A2] dark:bg-gray-600 dark:hover:bg-gray-500 text-black dark:text-white"
                  onClick={() => setIsPriceOpen((prev) => !prev)}
                >
                  Price Range
                  <span>{isPriceOpen ? "▲" : "▼"}</span>
                </button>
                {isPriceOpen && (
                  <div className="mt-2 space-y-2">
                    {priceRanges.map((p) => (
                      <label key={p.value} className="flex items-center gap-2 text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(p.value)}
                          onChange={() => handlePriceChange(p.value)}
                        />
                        {p.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center font-medium p-2 bg-gray-200 hover:bg-[#EEC5A2] dark:bg-gray-600 dark:hover:bg-gray-500 text-black dark:text-white"
                  onClick={() => setIsSizeOpen((prev) => !prev)}
                >
                  Size
                  <span>{isSizeOpen ? "▲" : "▼"}</span>
                </button>
                {isSizeOpen && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <label key={size} className="flex items-center gap-2 text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Colors */}
              <div className="mb-4">
                <button
                  className="w-full flex justify-between items-center font-medium p-2 bg-gray-200 hover:bg-[#EEC5A2] dark:bg-gray-600 dark:hover:bg-gray-500 text-black dark:text-white"
                  onClick={() => setIsColorOpen((prev) => !prev)}
                >
                  Color
                  <span>{isColorOpen ? "▲" : "▼"}</span>
                </button>
                {isColorOpen && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <label key={color} className="flex items-center gap-2 text-black dark:text-white">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => handleColorChange(color)}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-gray-400 dark:border-gray-500"
                          style={{ backgroundColor: color }}
                        ></span>
                        {color}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 mt-2 bg-gray-300 hover:bg-[#EEC5A2] dark:bg-gray-600 dark:hover:bg-gray-500 rounded text-black dark:text-white"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Products Section */}

          <div className="flex-1">
            {!isMobile && (
              <div className="hidden lg:flex justify-between items-center mb-6">
                <p className="text-black dark:text-white text-2xl font-serif">
                  Shop for your piece of Teeque
                </p>
                <select
                  className="p-1 border border-gray-400 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    scrollToProducts();
                  }}
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            )}
            {products.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No products found matching your criteria.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
