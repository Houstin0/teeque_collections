import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  useEffect(() => {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.textContent = `© ${currentYear} TEEQUE collections. All Rights Reserved.`;
    }
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };



  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Check your email for a 10% off coupon.');
  };

  return (
    <footer className="bg-charcoal text-soft-gray">
      {/* Newsletter Section */}
      <div className="border-b border-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-md mx-auto">
            <h3 className="font-serif text-2xl text-cream-white mb-4">
              Stay In Style
            </h3>
            <p className="text-sm mb-6 tracking-wide">
              Subscribe to get special offers, exclusive drops, and the latest updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-warm-gray border border-warm-gray rounded-md px-3 py-2 text-cream-white placeholder:text-soft-gray focus:outline-none focus:ring-2 focus:ring-warm-sage"
                required
              />
              <button 
                type="submit"
                className="bg-warm-sage hover:bg-opacity-90 text-cream-white px-6 py-2 rounded-md transition"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-3 text-warm-gray">
              Get 10% off your first order when you subscribe
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
  <Link to="/" className="flex items-center">
    <div
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
      className="flex flex-col items-start leading-none relative tracking-wide self-center"
    >
      <span className="text-3xl font-bold text-black">TEEQUE</span>
      <span className="text-base text-gray-900 ml-[4.25rem] mt-[-0.1rem]">
        Collections
      </span>
    </div>
  </Link>
            </div>
 
            <div className="flex space-x-3">
              <button className="p-2 rounded-full text-soft-gray hover:text-warm-sage transition">
                         <svg
              className="w-5 h-5"
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
                d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                clipRule="evenodd"
              />
            </svg>
              </button>
              <button className="p-2 rounded-full text-soft-gray hover:text-warm-sage transition">
                            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            </svg>
              </button>
              <button className="p-2 rounded-full text-soft-gray hover:text-warm-sage transition">
                           <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-cream-white text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Shop All', href: '/shop' },
                { name: 'New Arrivals', href: '/shop?filter=new' },
                { name: 'Collections', href: '/collections' },
                { name: 'Sale', href: '/shop?filter=sale' },
                { name: 'Gift Cards', href: '/gift-cards' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm hover:text-warm-sage transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-medium text-cream-white text-sm tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Contact Us', href: '/contact' },
                { name: 'Size Guide', href: '/size-guide' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Returns', href: '/returns' },
                { name: 'FAQ', href: '/faq' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm hover:text-warm-sage transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-cream-white text-sm tracking-wider uppercase mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-warm-sage mt-1 flex-shrink-0" />
                <p className="text-sm">
                  {/* 123 Fashion Street<br /> */}
                  Nairobi, Kenya
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-warm-sage flex-shrink-0" />
                <p className="text-sm"> 0757 166 412</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-warm-sage flex-shrink-0" />
                <p className="text-sm">hello@teequecollection.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-warm-gray"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-warm-gray">
                   <span
          id="currentYear"
          className="block text-sm text-black sm:text-center "
        >
          {" "}
        </span>
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-warm-gray hover:text-warm-sage transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-warm-gray hover:text-warm-sage transition-colors">
              Terms of Service
            </Link>
            {/* <Link to="/cookies" className="text-sm text-warm-gray hover:text-warm-sage transition-colors">
              Cookie Policy
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;