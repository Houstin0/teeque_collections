import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import productsData from "../db.json";
import CategoryBar from "./CategoryBar";
import { useCart } from "../context/CartContext";
import { useMediaQuery } from "react-responsive";

export default function Navbar({ onSearch }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(() => {
    const storedCartOpen = localStorage.getItem("isCartOpen");
    return storedCartOpen === "true";
  });
  const [previousLocation, setPreviousLocation] = useState(() => {
    return localStorage.getItem("previousLocation");
  });
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);

    const updatedIsDarkMode = !isDarkMode;

    if (typeof window !== "undefined") {
      const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
      const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  
      if (!updatedIsDarkMode) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor = "var(--bg-color-light)";
        localStorage.setItem("color-theme", "light");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add("hidden");
      } else {
        document.documentElement.style.backgroundColor = "var(--bg-color-dark)";
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add("hidden");
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove("hidden");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.backgroundColor = "var(--bg-color-dark)";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor = "var(--bg-color-light)";
      }
    }
  }, []);

  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

    if (themeToggleDarkIcon && themeToggleLightIcon) {
      if (isDarkMode) {
        themeToggleDarkIcon.classList.add("hidden");
        themeToggleLightIcon.classList.remove("hidden");
      } else {
        themeToggleDarkIcon.classList.remove("hidden");
        themeToggleLightIcon.classList.add("hidden");
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Close the search bar if clicked outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
        setIsMobileSearchVisible(false);
      }
    };

    // Bind event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    localStorage.setItem("isCartOpen", isCartOpen);
  }, [isCartOpen]);

  useEffect(() => {
    localStorage.setItem("previousLocation", previousLocation);
  }, [previousLocation]);

  useEffect(() => {
    if (location.pathname !== "/shoppingCart") {
      setIsCartOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileSearchVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    // Fetch data and initialize search suggestions
    const productTitles = productsData.products.map((product) => product.title);
    setSearchSuggestions(productTitles);
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      // Show all products if no query is entered
      const allProducts = productsData.products.map((product) => product.title);
      setSearchSuggestions(allProducts);
    } else {
      // Filter suggestions based on current query
      const filteredSuggestions = searchSuggestions.filter((title) =>
        title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchSuggestions(filteredSuggestions);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      setIsSearchVisible(false);
    } else {
      onSearch(searchQuery);
      setIsSearchVisible(false);
      setIsMobileSearchVisible(false);
      navigate("/searchResults");
      setSearchQuery("");
    }
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      // When search is opened, show all products initially
      const allProducts = productsData.products.map((product) => product.title);
      setSearchSuggestions(allProducts);
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
    if (!isMobileSearchVisible) {
      // When search is opened, show all products initially
      const allProducts = productsData.products.map((product) => product.title);
      setSearchSuggestions(allProducts);
    }
  };

  const toggleCart = () => {
    if (!isCartOpen) {
      setPreviousLocation(location.pathname);
      setIsCartOpen(true);
      navigate("/shoppingCart");
    } else {
      setIsCartOpen(false);
      navigate(previousLocation || "/");
      localStorage.setItem("isCheckout", false);
    }
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartItemCount(totalItems);
  }, [cartItems]);

  // Disable body scrolling when mobile search is visible
  useEffect(() => {
    if (isMobileSearchVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Clean up by removing the class when the component is unmounted
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMobileSearchVisible]);

  return (
    <header>
      <nav className="fixed w-full z-50 top-0 start-0 bg-gradient-to-r from-[#EEC5A2] to-gray-100 via-gray-100 dark:from-[#997D68] dark:to-black dark:via-black px-2 md:px-4">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto">
          {/*Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex flex-col items-start leading-none relative tracking-wide self-center">
              <span className="font-serif text-3xl font-bold text-black dark:text-white">
                TEEQUE
              </span>
              <span className="font-serif text-base text-gray-900 dark:text-gray-300 ml-[4.25rem] mt-[-0.1rem]">
                Collections
              </span>
            </div>
          </Link>

          {/* Center: Nav Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-10 text-gray-800 dark:text-gray-200 font-medium text-lg">
            <Link
              to="/"
              className="hover:text-[#B88C63] hover:underline transition font-serif"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="hover:text-[#B88C63] hover:underline transition font-serif"
            >
              Shop
            </Link>
            <Link
              to="/"
              className="hover:text-[#B88C63] hover:underline transition font-serif"
            >
              About
            </Link>
            <Link
              to="/"
              className="hover:text-[#B88C63] hover:underline transition font-serif"
            >
              Contact
            </Link>
            {/* Dark mode toggle button */}
            <button
              id="theme-toggle"
              type="button"
              onClick={toggleDarkMode}
              className="text-black dark:text-white lg:hover:bg-gray-200 lg:dark:hover:bg-gray-700 rounded-lg p-1"
            >
              <svg
                id="theme-toggle-dark-icon"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>

              <svg className="w-6 h-6 text-gray-400 dark:text-gray-300"
                          id="theme-toggle-light-icon"aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clip-rule="evenodd"/>
</svg>


            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-md z-10 flex flex-col items-center px-6 py-4 space-y-4 text-black dark:text-white font-medium text-lg md:hidden">
              <Link
                to="/"
                className="hover:text-[#B88C63] hover:underline transition font-serif"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="hover:text-[#B88C63] hover:underline transition font-serif"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="hover:text-[#B88C63] hover:underline transition font-serif"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#B88C63] hover:underline transition font-serif"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
                          {/* Dark mode toggle button */}
 <button
                        onClick={toggleDarkMode}
                        className="hover:text-[#B88C63] hover:underline transition font-serif"
                      >
                        {/* Moon icon for dark mode */}
                        <svg
                          className={`w-6 h-6 mr-2 text-gray-800 dark:text-white ${
                            isDarkMode ? "hidden" : "inline-block"
                          }`}
                          id="theme-toggle-dark-icon"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {/* Sun icon for light mode */}
                        <svg
                          className={`w-6 h-6 mr-2 text-gray-800 dark:text-white ${
                            isDarkMode ? "inline-block" : "hidden"
                          }`}
                          id="theme-toggle-light-icon"
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
                            d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          />
                        </svg>
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                      </button>
            </div>
          )}

          <div className="ml-auto flex items-center space-x-2">
            {!isSearchVisible ? (
              <button
                onClick={isMobile ? toggleMobileSearch : toggleSearchVisibility}
                className="flex items-center p-2 bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600"
              >
                {isMobileSearchVisible ? (
                  <svg
                    className="w-6 h-6 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
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
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                )}
              </button>
            ) : (
              <form
                ref={searchRef}
                onSubmit={handleSearchSubmit}
                className="flex items-center ml-auto relative"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-64 md:w-[300px] border border-green-400 dark:border-green-500 rounded-l-lg focus:outline-none bg-gray-50 dark:bg-gray-700 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery(""); // Clear the search query
                    setIsSearchVisible(false); // Close the search bar
                  }}
                  className="absolute -left-6 -top-1 m-1"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-400 dark:bg-blue-600 rounded-r-lg"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
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
                      strokeWidth="2"
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>

                {/* Autocomplete suggestions dropdown */}
                {isSearchVisible && (
                  <div className="absolute w-64 md:w-[300px] bg-gray-50 dark:bg-gray-700 border border-green-400 dark:border-green-500 shadow-lg z-20 left-0 top-full max-h-64 overflow-y-auto">
                    {searchSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-green-400 dark:hover:bg-green-600 dark:text-white"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          onSearch(suggestion);
                          navigate("/searchResults");
                          setIsSearchVisible(false);
                          setIsMobileSearchVisible(false);
                          setSearchQuery("");
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            )}

            <button onClick={toggleCart} className="relative p-2 ml-2">
              {!isCartOpen ? (
                <div>
                  <img
                    src="/icons/shopping-cart.png"
                    alt="Cart Icon"
                    className="w-8 h-8"
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute top-2 right-2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#EEC5A2] rounded-full flex items-center justify-center text-blaxk text-sm font-semibold">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              ) : (
                <svg
                  className="me-1.5 h-8 w-8"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#E02424"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              )}
            </button>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? (
                  // X Icon
                  <svg
                    className="w-10 h-10 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                ) : (
                  // Hamburger Icon
                  <svg
                    className="w-10 h-10 text-black dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 6H6m12 4H6m12 4H6m12 4H6"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Popup */}
      {isMobileSearchVisible && (
        <div className="fixed inset-0 top-[98px] z-50 flex p-2 justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-black p-4 rounded-lg w-11/12 max-w-lg relative">
            <button
              type="button"
              onClick={toggleMobileSearch}
              className="absolute left-4 top-1"
            >
              <svg
                className="w-8 h-8 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center ml-auto relative mt-6"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full py-2 pl-4 pr-10 border border-green-400 dark:border-green-500 rounded-l-lg focus:outline-none bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-400 dark:bg-blue-600 rounded-r-lg"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
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
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>

              {/* Add suggestions for mobile */}
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-b-lg max-h-[430px] overflow-y-auto z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-green-400 dark:hover:bg-green-600 dark:text-white"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        onSearch(suggestion);
                        navigate("/searchResults");
                        setIsSearchVisible(false);
                        setIsMobileSearchVisible(false);
                        setSearchQuery("");
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
