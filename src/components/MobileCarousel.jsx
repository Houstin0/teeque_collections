import { useState, useEffect } from "react";
import ProductCard from "./productCard";

const MobileCarousel = ({ products }) => {
 
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Loop back to the start
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length); // Loop to the end
  };

    // Automatically move to the next slide after 5 seconds
    useEffect(() => {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }, [currentIndex]);

  return (
    <div className="relative">
      <div className="flex justify-center mx-4">
        <ProductCard product={products[currentIndex]} />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
            <button
              className="absolute top-1/3 left-1 z-5 flex items-center justify-center h-10 w-10 bg-black rounded-full group"
              onClick={handlePrev}
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
              className="absolute top-1/3 right-1 z-5 flex items-center justify-center h-10 w-10 bg-black rounded-full group"
              onClick={handleNext}
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
    </div>
  );
};

export default MobileCarousel;
