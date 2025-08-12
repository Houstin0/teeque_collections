import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import productsData from "../db.json";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/UI/productCard";

function ProductDetails() {
  const { title } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("reviews");

  useEffect(() => {
    const found = productsData.products.find(
      (p) => p.title === decodeURIComponent(title)
    );
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes?.[0] || "");
      setSelectedColor(found.colors?.[0] || "");

      const related = productsData.products
        .filter(
          (p) =>
            p.title !== found.title &&
            p.category?.some((cat) => found.category?.includes(cat))
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [title]);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-white flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product, selectedSize, selectedColor, quantity });
    alert(
      `Added to cart: ${product.title} (${selectedSize}, ${selectedColor}) x${quantity}`
    );
  };

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const productImages = [product.image].filter(Boolean);

  const sampleReviews = [
    {
      name: "Alex M.",
      rating: 5,
      review: "Perfect fit and amazing quality. Love the design!",
    },
    {
      name: "Sarah K.",
      rating: 5,
      review: "Exactly what I was looking for. Great purchase!",
    },
    {
      name: "Jordan P.",
      rating: 4,
      review: "Good quality but runs slightly small. Size up!",
    },
  ];

  return (
    <div className="min-h-screen bg-cream-white">
      {/* Breadcrumb */}
      <div className="bg-soft-gray py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-warm-gray">
            <Link to="/" className="hover:text-warm-sage">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-warm-sage">
              Shop
            </Link>
            <span>/</span>
            <span className="text-charcoal">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/shop"
          className="mb-8 inline-flex items-center space-x-2 text-warm-gray hover:text-charcoal"
        >
          <ArrowLeft size={16} />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-soft-gray">
              <img
                src={productImages[currentImage] || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* small thumbnails (if you later add more images) */}
            {productImages.length > 1 && (
              <div className="flex space-x-2">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      currentImage === i
                        ? "border-warm-sage"
                        : "border-soft-gray"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-start justify-between mb-2">
              <h1 className="font-serif text-3xl font-light text-charcoal">
                {product.title}
              </h1>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`${
                  isWishlisted ? "text-warm-sage" : "text-warm-gray"
                } hover:text-warm-sage`}
                aria-pressed={isWishlisted}
              >
                <Heart
                  size={20}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl font-medium text-warm-sage">
                Ksh.{product.price}
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
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
              <span className="text-sm text-warm-gray">
                ({product.rating.toFixed(1) || 0} rating)
              </span>
            </div>

            <p className="text-warm-gray">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <label className="text-sm font-medium text-charcoal mb-3 block uppercase">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? "border-warm-sage bg-warm-sage text-cream-white"
                          : "border-soft-gray text-charcoal hover:border-warm-sage"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div>
                <label className="text-sm font-medium text-charcoal mb-3 block uppercase">
                  Color:{" "}
                  <span className="font-normal text-warm-gray">
                    {selectedColor}
                  </span>
                </label>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-warm-sage"
                          : "border-soft-gray"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                      aria-label={`Choose ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal mb-3 block uppercase">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 px-4 py-2 rounded-md text-cream-white flex items-center justify-center ${
                    product.instock
                      ? "bg-warm-sage hover:bg-warm-sage/90"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!product.instock}
                >
                  <ShoppingBag className="inline-block mr-2" size={18} />
                  {product.instock ? "Add to Cart" : "Out of Stock"}
                </button>

                <button
                  className="px-4 py-2 rounded-md border hover:bg-gray-100"
                  onClick={() => alert("Buy now flow not implemented")}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-6 border-t border-soft-gray">
              <div className="flex items-center space-x-3 text-sm text-warm-gray">
                <Truck size={16} className="text-warm-sage" />
                <span>Free shipping on orders over Ksh.5000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-warm-gray">
                <RotateCcw size={16} className="text-warm-sage" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-warm-gray">
                <Shield size={16} className="text-warm-sage" />
                <span>1-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="w-full">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-2 text-sm font-medium ${
                  activeTab === "reviews"
                    ? "border-b-2 border-black text-charcoal"
                    : "text-warm-gray"
                }`}
              >
                Reviews ({sampleReviews.length})
              </button>

              <button
                onClick={() => setActiveTab("care")}
                className={`py-2 text-sm font-medium ${
                  activeTab === "care"
                    ? "border-b-2 border-warm-sage text-charcoal"
                    : "text-warm-gray"
                }`}
              >
                Care Instructions
              </button>
            </div>

            <div className="mt-8">
              {activeTab === "reviews" && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="font-serif text-xl font-light text-charcoal mb-4">
                    Customer Reviews
                  </h3>
                  <div className="space-y-6">
                    {sampleReviews.map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-soft-gray pb-4 last:border-b-0"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex space-x-1">
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
                          <span className="font-medium text-charcoal">
                            {review.name}
                          </span>
                        </div>
                        <p className="text-warm-gray text-sm">
                          {review.review}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "care" && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h3 className="font-serif text-xl font-light text-charcoal mb-4">
                    Care Instructions
                  </h3>
                  <div className="space-y-4 text-warm-gray">
                    <p>
                      <strong>Washing:</strong> Machine wash cold with like
                      colors. Use gentle cycle.
                    </p>
                    <p>
                      <strong>Drying:</strong> Tumble dry low or hang dry for
                      best results.
                    </p>
                    <p>
                      <strong>Ironing:</strong> Iron on low heat if needed. Do
                      not iron directly on prints.
                    </p>
                    <p>
                      <strong>Storage:</strong> Hang or fold neatly to maintain
                      shape.
                    </p>
                    <p>
                      <strong>Professional Care:</strong> Dry cleaning
                      recommended for best longevity.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-3xl font-light text-charcoal mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={product.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
