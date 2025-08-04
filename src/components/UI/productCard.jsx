import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="min-w-[300px] bg-white rounded-b-lg shadow-lg shadow-black dark:bg-gray-800 dark:border-gray-700 shrink-0">
      <Link to={`/product/${encodeURIComponent(product.title)}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      </Link>

      <div className="p-4 pt-1">
        {/* Title */}
        <Link to={`/product/${encodeURIComponent(product.title)}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline font-serif">
            {product.title}
          </h5>
        </Link>

        {/* Category + Rating */}
        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-black capitalize">
            {Array.isArray(product.category)
              ? product.category.join(", ")
              : product.category}
          </p>

          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating
                      ? "text-yellow-500"
                      : "text-gray-400 dark:text-gray-500"
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
            <span className="text-blue-800 text-xs font-semibold ms-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs text-gray-500">Colors:</span>
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-black"
                style={{ backgroundColor: color }}
                title={color}
              ></span>
            ))}
          </div>
        )}

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="flex items-center space-x-1 mb-4">
            <span className="text-xs text-gray-500">Sizes:</span>
            {product.sizes.map((size, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 text-xs border border-gray-300 rounded"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            Ksh {product.price}
          </span>
          <button className="text-white bg-black hover:bg-[#EEC5A2] hover:text-black focus:ring-4 focus:outline-none font-semibold rounded-md text-sm px-5 py-2.5 font-serif">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
