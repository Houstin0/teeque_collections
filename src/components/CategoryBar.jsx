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
        if (scrollAmount >= maxScrollLeft) {
          scrollAmount = 0;
        } else {
          scrollAmount += 150;
        }
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      className="fixed z-10 top-[50px]  w-full bg-gradient-to-r from-[#EEC5A2] to-gray-100 via-gray-100 dark:from-gray-800 dark:to-gray-900 dark:via-gray-900 overflow-x-auto"
      ref={scrollRef}
    >
      <div className="flex flex-nowrap items-center gap-2 min-w-full">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className={`py-2 px-4 text-sm md:text-lg font-semibold rounded-md text-black dark:text-white hover:underline whitespace-nowrap ${
              cat === (selectedCategory || category)
                ? "bg-gray-500 dark:bg-gray-600 text-white"
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

