import { useRef } from "react";
import ProductCard from "../components/UI/productCard";

export default function ProductSlider({ productsData }) {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    current.scrollLeft += direction === "left" ? -300 : 300;
  };

  return (
    <div className="relative overflow-hidden pb-4 group">
      {/* Nav Buttons */}
      <div className="absolute inset-0 flex justify-between items-center z-10 pointer-events-none">
        <button
          className="h-[100px] px-2 flex rounded-r-xl items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
          onClick={() => scroll("left")}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
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
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 6 10"
          >
            <path d="m1 9 4-4-4-4" />
          </svg>
        </button>
      </div>

      {/* Product List */}
      <div
        ref={scrollRef}
        className="flex gap-8 mx-4 overflow-x-auto scroll-smooth no-scrollbar p-4"
      >
        {productsData.products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
