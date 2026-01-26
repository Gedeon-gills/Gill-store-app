import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
      className={`fixed top-0 left-0 w-full bg-blue-500 shadow-md z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="nav-sticky-logo text-xl font-bold">B-DIFFERENT</h1>

        {/* Menu */}
        <ul className="nav-sticky-menu flex gap-6">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/Shop">SHOP</Link>
          </li>
          <li>
            <Link to="/Pages">PAGES</Link>
          </li>
          <li>
            <Link to="/Blogs">BLOG</Link>
          </li>
          <li>
            <Link to="/Elements">ELEMENTS</Link>
          </li>

          <li>
            <a
              href="https://themeforest.net//cart/configure_before_adding/24187521?license=regular&support=bundle_6month&irgwc=1&afsrc=1&clickid=S4czo%3ASHGxycTqtVCZ10BWe8UkpScLU5vxGJR00&iradid=275988&irpid=2024187&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&mp_value1=&utm_campaign=af_impact_radius_2024187&utm_medium=affiliate&utm_source=impact_radius"
              target="blank"
            >
              BUY NOW
            </a>
          </li>
        </ul>

        {/* Actions */}
        <ul className="nav-sticky-actions flex gap-4">
          <li>
            <FaUser />
            Account
          </li>
          <li>
            <FaHeart /> <Link to={"/Favourites"}>FAVS</Link>
          </li>
          <li>
            <FaCartShopping />
            Carts
          </li>
        </ul>
      </div>
    </nav>
  );
}
