import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

function CategoryBar({ selectedCategory }) {
  const categories = [
    "Starter Kits",
    "Accessories",
    "Disposable",
    "E-liquids",
    "Nic Salts",
    "Drinks",
    "Dry Herb",
    "Pod Mods",
    "Mods",
    "Pod Devices",
  ];

  const { category } = useParams();
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        // If we've reached the end, scroll back to the start
        if (scrollAmount >= maxScrollLeft) {
          scrollAmount = 0;
        } else {
          scrollAmount += 150; // Scroll by 150px each time
        }
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(scrollInterval); // Cleanup interval on unmount
  }, []);

  return (
    <div
      className="fixed z-10 top-[48px] w-full bg-gradient-to-r from-[#EEC5A2] to-gray-100 via-gray-100 overflow-x-auto"
      ref={scrollRef}
    >
      <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-2 px-2">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className={`mx-2 py-1 px-3 text-sm md:text-lg font-semibold rounded-md text-black hover:underline whitespace-nowrap ${
              cat === (selectedCategory || category)
                ? "bg-gray-500"
                : "bg-transparent"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;
