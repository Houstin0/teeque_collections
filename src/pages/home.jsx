import { useState, useEffect } from "react";
import productsData from "../db.json";
import Carousel from "../components/UI/carousel";
import ProductSlider from "../components/productSlider";

const mockInstagramPosts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    likes: 1240,
    caption: "Street style that speaks volumes 🖤",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop",
    likes: 890,
    caption: "Minimalism meets urban edge",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    likes: 2100,
    caption: "Confidence is the best accessory",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=400&fit=crop",
    likes: 1560,
    caption: "Urban adventures await",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
    likes: 1800,
    caption: "Style that speaks without words",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=400&h=400&fit=crop",
    likes: 1120,
    caption: "Effortless elegance",
  },
];

const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Nairobi, Kenya",
    review:
      "Absolutely love the style and quality. I've never felt more confident in my clothes!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Kimani",
    location: "Mombasa, Kenya",
    review:
      "Their message and fashion truly inspire me. It’s more than just apparel.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Aisha Mwende",
    location: "Kisumu, Kenya",
    review:
      "The movement behind the clothes is what makes it powerful. Proud to be a supporter.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

function Home() {
  const totalProducts = productsData.products.length;


  return (
    <div className="flex flex-col">
      {/* Ad Carousel */}
      <Carousel />

      {/* Featured */}
      <section id="products" className="w-full py-14">
        <h2 className="font-serif text-center text-3xl md:text-5xl font-light text-charcoal mb-4">
          Featured Collection
        </h2>
        <p className="text-black text-xl max-w-2xl mx-auto mb-10 px-4">
          Handpicked pieces that embody our vision of modern streetwear. Each
          item crafted for those who dare to stand out.
        </p>
        {/* {isMobile ? (
          <MobileCarousel products={productsData.products} />
        ) : (
          <ProductSlider productsData={productsData} />
        )} */}
        <ProductSlider productsData={productsData} />

        <div className="flex items-center justify-center py-8">
          <button
            type="button"
            className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
          >
            View All Products
            <svg
              className="w-8 h-8 text-white" // you can change color/size here
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-6">
                More Than Fashion
              </h2>
              <p className="text-warm-gray text-lg leading-relaxed mb-6">
                At Teeque Collection, we believe clothing is a language. Every
                thread tells a story, every design speaks to the soul. We create
                pieces that don't just look good – they feel authentic to who
                you are.
              </p>
              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                From the bustling streets of urban centers to the quiet corners
                of creativity, our designs are inspired by real people living
                real lives, making real statements.
              </p>
              {/* <Button 
              asChild
              className="bg-warm-sage hover:bg-warm-sage/90 text-cream-white"
            >
              <Link to="/about" className="flex items-center space-x-2">
                <span>Our Story</span>
                <ArrowRight size={16} />
              </Link>
            </Button> */}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop"
                alt="Fashion 1"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop"
                alt="Fashion 2"
                className="w-full h-64 object-cover rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social media */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-charcoal mb-4">
              What They Say
            </h2>
            <p className="text-soft-gray text-lg mb-8">
              Follow us for daily style inspiration and behind-the-scenes
              content
            </p>
            <button
              variant="outline"
              className="border-warm-sage text-warm-sage hover:bg-warm-sage hover:text-cream-white"
            >
              {/* <Instagram className="mr-2" size={16} /> */}
              Follow @teequecollection
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockInstagramPosts.map((post) => (
              <div key={post.id} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                    {/* <Instagram size={24} className="mx-auto mb-2" /> */}
                    <p className="text-sm font-medium">{post.likes} likes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-warm-gray text-lg">Stories from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 shadow-lg rounded-lg text-center"
              >
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-warm-sage fill-warm-sage"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.538 1.118l-3.383-2.46a1 1 0 00-1.175 0l-3.383 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.965a1 1 0 00-.364-1.118l-3.383-2.46c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.965z" />
                    </svg>
                  ))}
                </div>
                <p className="text-warm-gray italic text-lg mb-6 leading-relaxed">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-charcoal">
                      {testimonial.name}
                    </p>
                    <p className="text-warm-gray text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      {/* <section id="popular-products" className="w-full mt-8">
        <h2 className="text-3xl font-bold px-2 mx-4 lg:mx-12 mb-3 text-black w-full bg-green-400 rounded-lg">
          Popular Products
        </h2>
        <div className="relative overflow-hidden">
          
          <div className="w-full py-4 px-4 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {popularProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
