import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"

function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, emptyCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mpesaMessage, setMpesaMessage] = useState("");
  const [mpesaError, setMpesaError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
  });

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://teeque-collections-api.onrender.com/api";

  // Calculate the total cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalOriginalPrice = cartItems.reduce(
    (total, item) => total + (item.originalPrice || item.price) * item.quantity,
    0
  );
  // Load cart open state from local storage on component mount
  useEffect(() => {
    const storedCartOpen = localStorage.getItem("isCartOpen") === "true";
    setIsCartOpen(storedCartOpen);

    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Save cart open state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("isCartOpen", isCartOpen.toString());
  }, [isCartOpen]);

  const closeCart = () => {
    setIsCartOpen(false);
    navigate(localStorage.getItem("previousLocation") || "/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWhatsAppOrder = () => {
    if (!formData.firstName || !formData.phone) {
      setMpesaError("Please enter your name and phone number");
      return;
    }

    // Format order summary for WhatsApp
    const orderItemsText = cartItems
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} - Ksh.${(item.price * item.quantity).toFixed(2)}`,
      )
      .join("\n");

    const message = `Hello!\nI'd like to place an order:\n${orderItemsText}\n\Total: Ksh.${totalCost.toFixed(2)}\n\Customer Name: ${formData.firstName}\nPhone: ${formData.phone}`;

    // Get WhatsApp number from environment or use fallback
    const whatsappNumber =
      import.meta.env.VITE_WHATSAPP_NUMBER || "254757166412";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Clear cart and show confirmation after a moment
    setIsModalOpen(true);
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    setMpesaMessage("");
    setMpesaError("");

    if (!formData.firstName || !formData.phone) {
      setMpesaError("Please enter your name and phone number");
      return;
    }

    if (!totalCost || totalCost <= 0) {
      setMpesaError("Your cart is empty. Please add items before paying.");
      return;
    }

    // Basic Safaricom number check before sending to backend
    const phoneDigits = formData.phone.replace(/[^\d]/g, "");
    if (phoneDigits.length !== 10 || !phoneDigits.startsWith("07")) {
      setMpesaError("Enter a valid Safaricom number in the format 07XXXXXXXX.");
      return;
    }

    try {
      setIsSubmitting(true);
      setMpesaMessage(
        "Sending STK push. Check your phone to approve the payment...",
      );

      const res = await fetch(`${API_BASE_URL}/payments/mpesa/stk-push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          amount: Number(totalCost.toFixed(2)),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMpesaError(
          data?.error ||
            "Failed to initiate M-Pesa STK push. Please try again.",
        );
        setMpesaMessage("");
        return;
      }

      setMpesaMessage(
        "STK push initiated successfully. Please complete the payment on your phone.",
      );
      setIsModalOpen(true);
    } catch (err) {
      setMpesaError(
        "Network error while initiating payment. Please try again.",
      );
      setMpesaMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear cart after modal closes for successful orders
    if (selectedPayment) {
      setTimeout(() => {
        emptyCart();
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="container mt-[110px] mx-auto p-2">
      <nav className="flex mb-2" aria-label="Breadcrumb ">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Shop
            </button>
          </li>

          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <svg
                className="w-5 h-5 me-1 text-gray-800 dark:text-white"
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
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Shopping Cart
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h2 className="text-2xl text-center font-bold mb-4 text-black dark:text-white">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-black dark:text-white">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="list-none rounded-lg border border-gray-200 bg-blue-100 dark:bg-gray-800 p-4 shadow-sm dark:border-gray-700 md:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Image */}
                <a href="#" className="shrink-0">
                  <img
                    className="h-16 w-16"
                    src={item.image}
                    alt={item.title}
                  />
                </a>

                {/* Title and Quantity */}
                <div className="flex-1 space-y-2">
                  <h1 className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h1>

                  {/* Quantity Control */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      type="button"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      className="w-8 text-center bg-transparent border-0 text-sm font-medium text-gray-900 focus:outline-none dark:text-white"
                      readOnly
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      type="button"
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    Ksh.{item.price}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    type="button"
                    className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}

      {/* Checkout Section */}
      {cartItems.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row gap-4 p-2">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 p-4 shadow-sm dark:border-gray-700 sm:p-6 sm:w-1/2">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      Ksh.{totalOriginalPrice.toFixed(2)}
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    Ksh.{totalCost.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 p-6 shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Information
            </h3>
            <div className="grid gap-4 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400"
                  placeholder="0712345678"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 p-6 shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Choose Payment Method
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* M-Pesa Payment Option */}
              <button
                onClick={() => {
                  setSelectedPayment("mpesa");
                  setMpesaError("");
                }}
                className={`p-6 rounded-lg border-2 transition-all transform hover:scale-105 ${
                  selectedPayment === "mpesa"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src="/icons/mpesa_logo.png"
                    alt="M-Pesa"
                    className="w-24 h-24 object-contain"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      M-Pesa
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quick & Secure Payment
                    </p>
                  </div>
                </div>
              </button>

              {/* WhatsApp Order Option */}
              <button
                onClick={() => {
                  setSelectedPayment("whatsapp");
                  setMpesaError("");
                }}
                className={`p-6 rounded-lg border-2 transition-all transform hover:scale-105 ${
                  selectedPayment === "whatsapp"
                    ? "border-green-600 bg-green-50 dark:bg-green-900"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src="/icons/whatsapp_logo.png"
                    alt="WhatsApp"
                    className="w-24 h-24 object-contain"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      WhatsApp Order
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Chat & Complete Order
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {mpesaError && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 rounded text-red-700 dark:text-red-200">
                {mpesaError}
              </div>
            )}

            {mpesaMessage && (
              <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded text-green-700 dark:text-green-200">
                {mpesaMessage}
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6">
              {selectedPayment === "mpesa" && (
                <button
                  onClick={handleMpesaPayment}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 rounded-lg text-white font-semibold transition duration-300 flex items-center justify-center space-x-2"
                >
                  <span>
                    {isSubmitting
                      ? "Processing..."
                      : `Pay Ksh.${totalCost.toFixed(2)} with M-Pesa`}
                  </span>
                </button>
              )}
              {selectedPayment === "whatsapp" && (
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 disabled:opacity-60 rounded-lg text-white font-semibold transition duration-300 flex items-center justify-center space-x-2"
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

                  <span>Complete order with WhatsApp</span>
                </button>
              )}
              {!selectedPayment && (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Select a payment method above
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={closeCart}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-primary-700 underline hover:no-underline dark:text-primary-500"
            >
              Close Cart and Continue Shopping
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg relative flex flex-col p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {selectedPayment === "mpesa"
                    ? "Payment Request Sent"
                    : "Order Sent Successfully!"}
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={closeModal}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {selectedPayment === "mpesa"
                  ? "We have sent an M-Pesa STK push to your phone. Approve the request to complete the payment."
                  : "Your order has been sent via WhatsApp. Our team will confirm your order shortly."}
              </p>
              <div className="mt-6">
                <button
                  onClick={closeModal}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="hidden xl:mt-8 xl:block">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
          <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
            <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
              </a>
              <div>
                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">iMac 27"</a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $399,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$299</p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"strokeWidth="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg" alt="imac image" />
                <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg" alt="imac image" />
              </a>
              <div>
                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Playstation 5</a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $799,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$499</p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-2" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"WstrokeWidth="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <div className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <a href="#" className="overflow-hidden rounded">
                <img className="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                <img className="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
              </a>
              <div>
                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">Apple Watch Series 8</a>
                <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">This generation has some improvements, including a longer continuous battery life.</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <span className="line-through"> $1799,99 </span>
                </p>
                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">$1199</p>
              </div>
              <div className="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-3" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-3" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>

                <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"WstrokeWidth="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div> */}
    </div>
  );
}

export default ShoppingCart;
