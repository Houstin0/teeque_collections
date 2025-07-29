import { useCart } from "../context/CartContext";

import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const generateWhatsAppLink = (product) => {
    const message = `Hi, I'm interested in buying the product: ${product.title}, priced at Ksh.${product.price}.`;
    return `https://api.whatsapp.com/send?phone=254727041155&text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="min-w-full md:max-w-72 bg-blue-50 rounded-lg shadow-lg shadow-black">
      {/* Product Image */}
      <Link to={`/product/${encodeURIComponent(product.title)}`}>
        <div className="w-full h-72 overflow-hidden">
          <img
            className="rounded-t-lg cursor-pointer w-full h-full object-cover"
            src={product.image}
            alt="product"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-3">
        <Link to={`/product/${encodeURIComponent(product.title)}`}>
          <h5 className="cursor-pointer text-lg font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
            {product.title}
          </h5>
        </Link>
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Ksh.{product.price}
          </span>
        </div>
        {/* Buttons */}
        <div className="mt-4 flex justify-between items-center space-x-2">
          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="text-white bg-[#0A005A] lg:hover:bg-[#FC411E] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 flex items-center justify-center"
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
            Buy
          </button>

          {/* WhatsApp Button */}
          <a
            // href={generateWhatsAppLink(product)}
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-green-600 lg:hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                clipRule="evenodd"
              />
              <path
                fill="currentColor"
                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
              />
            </svg>
          </a>

          {/* View Details Button */}
          <Link
            to={`/product/${encodeURIComponent(product.title)}`}
            className="text-white bg-blue-500 lg:hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2.5 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 text-white mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            view
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
