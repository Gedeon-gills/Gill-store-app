import { FaCartShopping, FaHeart, FaUser, FaMagnifyingGlass } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CartDrawer from "../ui/cartsPopup";
import LoginModal from "../ui/login";
import PageLoader from "../ui/PageLoader";
import UserAvatar from "../ui/UserAvatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function StickyNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let lastY = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Never show navbar on Home page
      if (location.pathname === "/") {
        setShow(false);
        lastY = currentY;
        return;
      }

      // Show navbar when scrolling DOWN after 100px, hide when scrolling UP
      if (currentY > 100 && currentY > lastY) {
        setShow(true);
      } else if (currentY < lastY) {
        setShow(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }

    // Listen for user updates
    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser && updatedUser !== 'undefined') {
        try {
          setUser(JSON.parse(updatedUser));
        } catch (error) {
          console.error('Error parsing updated user data:', error);
        }
      }
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, []);

  const handleLoginSuccess = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  };

  const handleProfileClick = () => {
    if (user) {
      setLoading(true);
      setTimeout(() => {
        navigate('/profile');
        setLoading(false);
      }, 500);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-blue-500 shadow-lg z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center p-2 sm:p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-white text-2xl sm:text-3xl font-bold">
          GillStore<span className="text-white">.</span>
        </div>

        {/* Center - Home Features */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/" className="flex items-center gap-1 text-white hover:text-gray-200 transition-colors">
            <FaHome className="text-sm" />
            <span className="hidden sm:inline text-sm">Home</span>
          </Link>
          <div className="flex items-center bg-white/20 rounded-full px-2 sm:px-3 py-1">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white placeholder-gray-200 outline-none text-xs sm:text-sm w-20 sm:w-32"
            />
            <FaMagnifyingGlass className="text-white text-xs ml-1" />
          </div>
        </div>

        {/* Menu - Hidden on mobile */}
        <ul className="nav-sticky-menu hidden lg:flex gap-4 xl:gap-6 text-white text-sm">
          <li className="hover:text-gray-200 transition-colors">
            <Link to="/Shop">SHOP</Link>
          </li>
          <li className="hover:text-gray-200 transition-colors">
            <Link to="/Pages">PAGES</Link>
          </li>
          <li className="hover:text-gray-200 transition-colors">
            <Link to="/Blogs">BLOG</Link>
          </li>
          <li className="hover:text-gray-200 transition-colors">
            <Link to="/Elements">ELEMENTS</Link>
          </li>
          <li>
            <a
              href="https://themeforest.net//cart/configure_before_adding/24187521?license=regular&support=bundle_6month&irgwc=1&afsrc=1&clickid=S4czo%3ASHGxycTqtVCZ10BWe8UkpScLU5vxGJR00&iradid=275988&irpid=2024187&iradtype=ONLINE_TRACKING_LINK&irmptype=mediapartner&mp_value1=&utm_campaign=af_impact_radius_2024187&utm_medium=affiliate&utm_source=impact_radius"
              target="_blank"
              className="bg-white text-blue-500 px-3 py-1 rounded font-bold hover:bg-gray-100 transition-colors"
            >
              BUY NOW
            </a>
          </li>
        </ul>

        {/* Actions */}
        <ul className="nav-sticky-actions flex gap-2 sm:gap-4 text-white text-xs sm:text-sm">
          <li 
            onClick={handleProfileClick}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
          >
            {user ? (
              <UserAvatar user={user} size="sm" showUsername={true} />
            ) : (
              <>
                <FaUser className="text-xs sm:text-sm" />
                <span className="hidden sm:inline">Account</span>
              </>
            )}
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors">
            <FaHeart className="text-xs sm:text-sm" /> 
            <Link to={"/Favourites"} className="hidden sm:inline">FAVS</Link>
          </li>
          <li 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition-colors"
          >
            <FaCartShopping className="text-xs sm:text-sm" />
            <span className="hidden sm:inline">Carts</span>
          </li>
        </ul>
      </div>
      
      {loading && <PageLoader />}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </nav>
  );
}
