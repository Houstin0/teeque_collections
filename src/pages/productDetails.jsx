import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../db.json";
import { useCart } from "../context/CartContext"

function ProductDetails() {
  const { addToCart } = useCart();
  const { title } = useParams(); // Get product title from the URL
  const [product, setProduct] = useState(null); // State for the product data

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const Product = productsData.products.find(
          (p) => p.title === decodeURIComponent(title)
        );
        setProduct(Product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [title]);
  // If product is not yet loaded, show a loading state or placeholder
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-[120px] mx-auto ">
      <nav className="flex mt-4 ml-4" aria-label="Breadcrumb ">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-400 dark:hover:text-white"
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
              Home
            </a>
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
                {decodeURIComponent(title)}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="relative w-full max-h-screen p-6">
        <section className="antialiased overflow-y-auto">
          <div className="max-w-screen-xl mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img
                  className="w-full lg:max-h-[420px]"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {product.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    Ksh.{product.price}
                  </p>
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    onClick={() => addToCart(product)}
                    className="text-white mt-4 sm:mt-0 bg-[#0A005A] lg:hover:bg-[#FC411E] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                <hr className="my-6 md:my-8 border-black" />
                <p className="mb-6 text-black">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
