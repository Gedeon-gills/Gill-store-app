import {
  FaHome,
  FaPhone,
  FaMailBulk,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWifi,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 h-100">
        {/* Brand */}
        <ul className="space-y-4">
          <li className="text-white text-xl font-bold">B-DIFFERENT</li>
          <li className="text-sm">The pathway to Greatness and Great Energy</li>
          <li className="flex items-center gap-3 text-sm">
            <FaHome /> Kigali
          </li>
          <li className="flex items-center gap-3 text-sm">
            <FaPhone /> +250-785-220-022
          </li>
          <li className="flex items-center gap-3 text-sm">
            <FaMailBulk /> tresormugisha07@gmail.com
          </li>
          <li className="flex items-center gap-3 text-sm">
            <FaClock /> Mon-Fri / 8:00am-6:00pm
          </li>
        </ul>

        {/* Information */}
        <ul className="space-y-3">
          <li className="text-white font-semibold uppercase">Information</li>
          {[
            "About Us",
            "Store Location",
            "Contact Us",
            "Shipping & Delivery",
            "Latest News",
            "Our Sitemap",
          ].map((item) => (
            <li key={item} className="hover:text-white cursor-pointer text-sm">
              {item}
            </li>
          ))}
        </ul>

        {/* Services */}
        <ul className="space-y-3">
          <li className="text-white font-semibold uppercase">Our Services</li>
          {[
            "Privacy Policy",
            "Terms of Sales",
            "Customer Services",
            "Delivery Information",
            "Payments",
            "Saved Cards",
          ].map((item) => (
            <li key={item} className="hover:text-white cursor-pointer text-sm">
              {item}
            </li>
          ))}
        </ul>

        <ul className="space-y-3">
          <li className="text-white font-semibold uppercase">My Account</li>
          {[
            "My Shop",
            "My Cart",
            "Checkout",
            "My Wishlist",
            "Tracking Order",
          ].map((item) => (
            <li key={item} className="hover:text-white cursor-pointer text-sm">
              {item}
            </li>
          ))}
        </ul>

        {/* Newsletter */}
        <ul className="space-y-4">
          <li className="text-white font-semibold uppercase">Newsletter</li>
          <li className="text-sm">
            Subscribe to our mail to get the new updates!
          </li>
          <li className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 text-sm text-white hover:bg-blue-700 w-40">
              SIGN UP
            </button>
          </li>
          <li className="flex gap-4 text-lg text-gray-400">
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedin className="hover:text-white cursor-pointer" />
            <FaWifi className="hover:text-white cursor-pointer" />
          </li>
        </ul>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 mt-12 py-6 text-center text-sm text-gray-400">
        B-DIFFERENT © 2026 by PressLayouts. All Rights Reserved.
      </div>
    </footer>
  );
}
