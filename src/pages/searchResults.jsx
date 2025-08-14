import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import productsData from "../db.json";
import ProductCard from "../components/UI/productCard";

export default function SearchResults({ searchQuery}) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    } else {
      // Filter products based on search query
      const filteredProducts = productsData.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredProducts);
    }
  }, [searchQuery]);

  return (
    <div className="mt-[100px] pt-6">
     
        <nav className="flex ml-4 lg:ml-12 mb-2" aria-label="Breadcrumb ">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link to="/shop"
                className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Shop
              </Link>
            </li>

            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Search Results
                </span>
              </div>
            </li>
          </ol>
        </nav>
     

      {searchResults.length === 0 ? (
        <h1 className="text-center mb-10 text-4xl font-extrabold text-black dark:text-white">
          No results
        </h1>
      ) : (
        <div>
          <h1 className="mb-6 text-center text-2xl font-extrabold text-black dark:text-white">
            Search Results for
            <span className="text-blue-500 dark:text-blue-400"> &quot;{searchQuery}&quot;</span>
          </h1>
          <section id="products" className="w-full py-4 px-4 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
        </div>
      )}
    </div>
  );
}
