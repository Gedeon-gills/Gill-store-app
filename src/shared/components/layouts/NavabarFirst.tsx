import { useState } from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="bg-blue-700 text-white text-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
        
        {/* LEFT: Language & Currency */}
        <div className="flex gap-4 items-center">
          {/* Language */}
          <div className="relative">
            <span
              className="cursor-pointer px-2 py-1 hover:bg-blue-800 rounded"
              onClick={() => setLangOpen(!langOpen)}
            >
              English ▾
            </span>
            {langOpen && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white text-gray-700 border border-gray-200 shadow-md z-50">
                {["English", "French", "Spanish"].map((lang) => (
                  <div
                    key={lang}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setLangOpen(false)}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Currency */}
          <div className="relative">
            <span
              className="cursor-pointer px-2 py-1 hover:bg-blue-800 rounded"
              onClick={() => setCurrencyOpen(!currencyOpen)}
            >
              $ Dollar ▾
            </span>
            {currencyOpen && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-white text-gray-700 border border-gray-200 shadow-md z-50">
                {["$ Dollar (US)", "€ Euro (EUR)", "£ Pound (UK)"].map((cur) => (
                  <div
                    key={cur}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setCurrencyOpen(false)}
                  >
                    {cur}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Links */}
        <div className="hidden sm:flex gap-6 items-center">
          <span>Welcome to our store!</span>
          <span className="cursor-pointer">Blog</span>
          <span className="cursor-pointer">FAQ</span>
          <span className="cursor-pointer">
            <Link to={"/ContactUs"}>Contact Us</Link>
          </span>
        </div>

        {/* MOBILE: More dropdown */}
        <div className="sm:hidden relative">
          <button
            className="px-2 py-1 border rounded"
            onClick={() => setMoreOpen(!moreOpen)}
          >
            More ▾
          </button>
          {moreOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white text-gray-700 border border-gray-200 shadow-md z-50 flex flex-col">
              <span className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Welcome to our store!
              </span>
              <span className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Blog
              </span>
              <span className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                FAQ
              </span>
              <span className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to={"/ContactUs"}>Contact Us</Link>
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
