import { FaBlog, FaPhone, FaBook } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
export default function FirstNavBar() {
  const [LangOpen, setLangOpen] = React.useState(false);
  const [CurrOpen, setCurrOpen] = React.useState(false);

  return (
    <nav className="bg-blue-600 text-white text-xs px-2 sm:px-4 lg:px-6 py-1.5 flex items-center justify-between">
      {/* Left - Language & Currency (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-4">
        <div
          className="relative"
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
        >
          <div className="cursor-pointer hover:text-gray-200">LANGUAGES</div>

          {LangOpen && (
            <ul className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-sm min-w-[120px] z-50">
              <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs">
                ENGLISH
              </li>
              <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs">
                FRENCH
              </li>
              <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs">
                KINYARWANDA
              </li>
            </ul>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setCurrOpen(true)}
          onMouseLeave={() => setCurrOpen(false)}
        >
          <div className="cursor-pointer hover:text-gray-200">CURRENCY</div>

          {CurrOpen && (
            <ul className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded shadow-sm min-w-[100px] z-50">
              <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs">
                RWF
              </li>
              <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs">
                USD
              </li>
              <li className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs">
                EUR
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Center - Welcome Message */}
      <h3 className="font-medium tracking-wide text-center flex-1 md:flex-none text-xs sm:text-sm">
        WELCOME TO OUR STORE
      </h3>

      {/* Right - Links */}
      <ul className="hidden sm:flex gap-2 lg:gap-4">
        <li className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
          <FaBlog className="text-[10px]" /> <Link to={"/BLogs"}>BLOG</Link>
        </li>
        <li className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
          <FaBook className="text-[10px]" /> <Link to={"/FAQ"}>FAQ</Link>
        </li>
        <li className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
          <FaPhone className="text-[10px]" />
          <Link to={"/ContactUs"} className="hidden lg:inline">CONTACT US</Link>
          <Link to={"/ContactUs"} className="lg:hidden">CONTACT</Link>
        </li>
      </ul>

      {/* Mobile - Contact only */}
      <div className="sm:hidden">
        <Link to={"/ContactUs"} className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
          <FaPhone className="text-[10px]" /> CONTACT
        </Link>
      </div>
    </nav>
  );
}
