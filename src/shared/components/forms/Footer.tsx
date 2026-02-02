import {} from "react";
import Forms from "../../components/ui/footerform";
import {
  FaHouseUser,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";

const Footer = () => {
  const footerSections = [
    {
      title: "INFORMATION",
      links: [
        "About Us",
        "Store Location",
        "Contact Us",
        "Shipping & Delivery",
        "Latest News",
        "Our Sitemap",
      ],
    },
    {
      title: "OUR SERVICE",
      links: [
        "Privacy Policy",
        "Terms of Sale",
        "Customer Service",
        "Delivery Information",
        "Payments",
        "Saved Cards",
      ],
    },
    {
      title: "MY ACCOUNT",
      links: [
        "My Account",
        "My Shop",
        "My Cart",
        "Checkout",
        "My Wishlist",
        "Tracking Order",
      ],
    },
  ];

  return (
    <footer className="bg-[#1a2b3c] text-gray-300 py-12 px-6 font-sans">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="space-y-4">
          <h2 className="text-white text-3xl font-bold italic">GillStore.</h2>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaHouseUser size={16} /> Lorem Ipsum, 2046 Lorem Ipsum
            </li>
            <li className="flex items-center gap-3">
              <FaPhone size={16} /> 576-245-2478
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope size={16} /> info@GillStore.com
            </li>
            <li className="flex items-center gap-3">
              <FaClock size={16} /> Mon - Fri / 9:00 AM - 6:00 PM
            </li>
          </ul>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-white font-bold mb-6 text-sm tracking-wider">
              {section.title}
            </h3>
            <ul className="space-y-3 text-sm">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div> <Forms /></div> 
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
        <p className="text-xs text-gray-500">
          GillStore © 2026 by PressLayouts All Rights Reserved.
        </p>
        <div className="flex gap-2 grayscale opacity-70">
          <div className="h-6 w-10 bg-white rounded-sm"></div>
          <div className="h-6 w-10 bg-white rounded-sm"></div>
          <div className="h-6 w-10 bg-white rounded-sm"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer
