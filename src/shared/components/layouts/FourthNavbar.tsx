import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function StickyNavBar() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let lastY = 0; // previous scroll position

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Never show navbar on Home page
      if (location.pathname === "/") {
        setShow(false);
        lastY = currentY; // keep tracking
        return;
      }

      // Only show navbar when scrolling UP after scrolling down at least 50px
      if (currentY < lastY && currentY > 50) {
        setShow(true);
      } else if (currentY > lastY) {
        setShow(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="nav-sticky-logo text-xl font-bold">B-DIFFERENT</h1>

        {/* Menu */}
        <ul className="nav-sticky-menu flex gap-6">
          <li>HOME</li>
          <li>SHOP</li>
          <li>PAGES</li>
          <li>BLOG</li>
          <li>ELEMENTS</li>
          <li>BUY NOW</li>
        </ul>

        {/* Actions */}
        <ul className="nav-sticky-actions flex gap-4">
          <li>Hello, SIGN IN</li>
          <li>❤️</li>
          <li>🛒</li>
        </ul>
      </div>
    </nav>
  );
}
