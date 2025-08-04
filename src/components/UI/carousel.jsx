import { useState, useEffect, useRef } from "react";
import productsData from "../../db.json";

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

  return (
    <div className="flex flex-col lg:flex-row items-start mt-[60px]">
      <div
        id="default-carousel"
        className="relative w-full"
        ref={carouselRef}
      >
        {/* Slide Container */}
        <div className="relative h-[450px] md:h-[550px] overflow-hidden">
          {productsData.ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`absolute inset-0 duration-700 ease-in-out transition-opacity ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Image */}
              <img
                src={ad.image}
                className="w-full h-full object-cover"
                alt={ad.title}
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/40">
                <h1 className="font-serif mb-2 text-xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold text-white drop-shadow">
                  Not just clothes — it’s a movement.
                </h1>
                <p className="font-serif text-sm sm:text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow">
                  Discover premium streetwear that defines your identity.
                </p>
                <p className="font-serif mb-4 text-sm sm:text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow">
                  Fashion isn’t what you wear, it’s who you are becoming.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <a
                    href="#"
                    className="inline-flex justify-center items-center py-2 px-4 sm:py-3 sm:px-5 text-sm sm:text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow"
                  >
                    Shop Now
                  </a>
                  <a
                    href="#"
                    className="inline-flex justify-center items-center py-2 px-4 sm:py-3 sm:px-5 text-sm sm:text-base font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg shadow"
                  >
                    View Collection
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
