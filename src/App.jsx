import "./App.css";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Contact from "./pages/contact";
import Footer from "./components/footer";
import SearchResults from "./pages/searchResults";
import CategoryPage from "./pages/CategoryPage";
import ShoppingCart from "./pages/shoppingCart";
import ProductDetails from "./pages/productDetails";
import Checkout from "./pages/checkOut";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-gradient-to-r from-[#EEC5A2] to-gray-100 via-gray-100 overflow-x-hidden">
        <NavBar onSearch={handleSearch} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/searchResults"
            element={<SearchResults searchQuery={searchQuery} />}
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:title" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/shoppingCart/checkOut" element={<Checkout />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
