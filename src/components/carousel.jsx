import { useState, useEffect, useRef } from "react";
import productsData from "../db.json";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productsData.ads.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productsData.ads.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      console.log("Carousel dimensions:", {
        width: carouselRef.current.offsetWidth,
        height: carouselRef.current.offsetHeight,
      });
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col lg:flex-row items-start mt-[60px]">
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
        ref={carouselRef}
      >




        <div className="relative h-56 overflow-hidden md:h-[550px]">
          {productsData.ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`absolute inset-0 duration-700 ease-in-out transition-opacity ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              data-carousel-item
            >
              {/* Image */}
              <img
                src={ad.image}
                className="w-full h-full object-cover"
                alt={ad.title}
              />

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/40">
                <h1 className="font-serif mb-4 text-4xl font-extrabold text-white md:text-7xl drop-shadow">
                  {/* This isn’t just fashion. This is a movement. */}
                  Not just clothes — it’s a movement.
                </h1>
                <p className="font-serif text-lg font-medium text-gray-200 md:text-2xl max-w-2xl drop-shadow">
                  Discover premium streetwear that defines your identity.
                </p>
                <p className="font-serif mb-6 text-lg font-medium text-gray-200 md:text-2xl max-w-2xl drop-shadow">
                 Fashion isn’t what you wear, it’s who you are becoming.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow"
                  >
                    Shop Now
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg shadow"
                  >
                    View Collection
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        {/* <button
          type="button"
          className="absolute top-0 left-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group opacity-0 hover:opacity-100"
          onClick={prevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-gray-800/60">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group opacity-0 hover:opacity-100"
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-gray-800/60">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button> */}
      </div>
    </div>
  );
};

export default Carousel;
