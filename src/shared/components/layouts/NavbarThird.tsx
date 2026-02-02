import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function DownBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
        {/* Left: Shop by Department */}
        <div className="flex items-center gap-2 font-semibold">
          <span className="hidden sm:inline">SHOP BY DEPARTMENT</span>
          <FaBars className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex gap-8 text-sm">
          <Link to="/" className="hover:text-blue-600">HOME ▾</Link>
          <Link to="/shop" className="hover:text-blue-600">SHOP ▾</Link>
          <Link to="/Pages" className="hover:text-blue-600">PAGES ▾</Link>
          <Link to="/Blogs" className="hover:text-blue-600">BLOG ▾</Link>
          <Link to="/Elements" className="hover:text-blue-600">ELEMENTS ▾</Link>
          <Link to="/Buy" className="font-semibold hover:text-blue-600">BUY NOW</Link>
        </nav>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 h-full p-6 flex flex-col gap-6 relative">
              <FaTimes
                className="absolute top-4 right-4 text-xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
              <Link to="/" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>HOME ▾</Link>
              <Link to="/shop" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>SHOP ▾</Link>
              <Link to="/Pages" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>PAGES ▾</Link>
              <Link to="/Blogs" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>BLOG ▾</Link>
              <Link to="/Elements" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>ELEMENTS ▾</Link>
              <Link to="/Buy" className="font-semibold hover:text-blue-600" onClick={() => setMenuOpen(false)}>BUY NOW</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
