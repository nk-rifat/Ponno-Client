"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Logo } from "../shared/Logo";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* BRAND */}
          <div className="text-center">
            <div className="flex justify-center">
              <Logo />
            </div>

            <p className="text-sm text-gray-400 hover:text-white mt-3 leading-relaxed">
              Ponno – Handmade & traditional e-commerce marketplace for quality
              products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>

            <div className="flex justify-center gap-3 text-base text-gray-400">
              <Link
                href="/products"
                className="hover:text-green-600 transition"
              >
                Products
              </Link>

              <Link
                href="/new-arrivals"
                className="hover:text-green-600 transition"
              >
                New Arrivals
              </Link>
              <Link
                href="/about-us"
                className="hover:text-green-600 transition"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* COMPANY */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Company</h3>

            <div className="flex justify-center gap-3 text-base text-gray-400">
              <Link href="/contact" className="hover:text-green-600 transition">
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-green-600 transition"
              >
                Privacy
              </Link>
              <Link
                href="/terms-conditions"
                className="hover:text-green-600 transition"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>

            <div className="flex justify-center gap-4">
              <a href="#">
                <FaFacebookF className="text-gray-500 text-lg hover:text-blue-600 transition" />
              </a>
              <a href="#">
                <FaInstagram className="text-gray-500 text-lg hover:text-pink-500 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-50 mt-6 pt-5 text-sm text-center text-gray-400 hover:text-white">
          <p className=" mb-2">Strong and beautiful, just like nature.</p>
          <p>© {year} Ponno. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
