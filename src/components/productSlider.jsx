import { useRef } from "react";

export default function ProductSlider({ productsData }) {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <div className="relative overflow-hidden pb-4 group">
      {/* Custom Nav Buttons */}
      <div className="absolute inset-0 flex justify-between items-center z-10 pointer-events-none">
        <button
          className="h-[100px] px-2 flex rounded-r-xl items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
          onClick={() => scroll("left")}
        >
          <svg
            className="w-8 h-8 text-white rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 6 10"
          >
            <path d="M5 1 1 5l4 4" />
          </svg>
        </button>

        <button
          className="h-[100px] px-2 flex rounded-l-xl items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
          onClick={() => scroll("right")}
        >
          <svg
            className="w-8 h-8 text-white rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 6 10"
          >
            <path d="m1 9 4-4-4-4" />
          </svg>
        </button>
      </div>

      {/* Product Cards */}
      <div
        ref={scrollRef}
        className="flex gap-8 mx-4 overflow-x-auto scroll-smooth no-scrollbar p-4"
      >
        {productsData.products.map((product, index) => (
          <div key={index} className="shrink-0">
            <div className="w-[320px] bg-white rounded-b-lg shadow-lg shadow-black dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  src={product.image}
                  alt="product image"
                  className="w-full h-[320px] object-cover"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? "text-yellow-300"
                            : "text-gray-200 dark:text-gray-600"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <a
                    href="#"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
