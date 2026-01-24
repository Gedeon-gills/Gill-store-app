import { FaBlog, FaPhone, FaBook } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
export default function FirstNavBar() {
  const [LangOpen, setLangOpen] = React.useState(false);
  const [CurrOpen, setCurrOpen] = React.useState(false);

  return (
    <nav className="bg-blue-600 text-white text-xs px-6 py-1.5 flex items-center justify-between">
      {/* Language */}
      <div
        className="relative"
        onMouseEnter={() => setLangOpen(true)}
        onMouseLeave={() => setLangOpen(false)}
      >
        <div className="cursor-pointer hover:text-gray-200">LANGUAGES</div>

        {LangOpen && (
          <ul className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-sm min-w-[120px] z-50">
            <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">
              ENGLISH
            </li>
            <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">
              FRENCH
            </li>
            <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">
              KINYARWANDA
            </li>
          </ul>
        )}
      </div>

      {/* Currency */}
      <div
        className="relative"
        onMouseEnter={() => setCurrOpen(true)}
        onMouseLeave={() => setCurrOpen(false)}
      >
        <div className="cursor-pointer hover:text-gray-200">CURRENCY</div>

        {CurrOpen && (
          <ul className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-sm min-w-[100px] z-50">
            <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">
              RWF
            </li>
            <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">
              USD
            </li>
            <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer">
              EUR
            </li>
          </ul>
        )}
      </div>

      <h3 className="font-medium tracking-wide">WELCOME TO OUR STORE</h3>

      {/* Right */}
      <ul className="flex gap-4">
        <li className="flex items-center gap-1.5 cursor-pointer hover:text-gray-200">
          <FaBlog className="text-[10px]" /> <Link to={"/BLog"}>BLOG</Link>
        </li>
        <li className="flex items-center gap-1.5 cursor-pointer hover:text-gray-200">
          <FaBook className="text-[10px]" /> <Link to={"/FAQ"}>FAQ</Link>
        </li>
        <li className="flex items-center gap-1.5 cursor-pointer hover:text-gray-200">
          <FaPhone className="text-[10px]" /> <Link to={"/ContactUs"}>CONTACT US</Link>
        </li>
      </ul>
    </nav>
  );
}
