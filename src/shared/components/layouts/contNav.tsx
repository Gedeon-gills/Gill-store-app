import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaChevronLeft,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../ui/cartsPopup";
import { useState, useEffect } from "react";
import LoginModal from "../ui/login";
import RegisterModal from "../ui/register";
import PageLoader from "../ui/PageLoader";
import UserAvatar from "../ui/UserAvatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    }
  }

  return null;
};

export default function DownBar() {
  const navigate = useNavigate();

  // STATES
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(getInitialUser);
  const [loading, setLoading] = useState(false);

  // HANDLERS
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Listen for login events from anywhere
  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem("user");

      if (updatedUser && updatedUser !== "undefined") {
        try {
          setUser(JSON.parse(updatedUser));
        } catch (error) {
          console.error("Error parsing updated user data:", error);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  const handleLoginSuccess = () => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }

    setIsLoginOpen(false);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    navigate("/shop");
  };

  return (
    <div className="bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center px-4 py-4 justify-between">
        {/* LOGO */}
        <div className="text-white text-2xl sm:text-3xl font-bold">
          GillStore<span className="text-white">.</span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex flex-1 justify-center text-white text-[12px] gap-5">
          <Link to="/" className="hover:text-blue-400">
            HOME ▾
          </Link>

          <Link to="/shop" className="hover:text-blue-400">
            SHOP ▾
          </Link>

          <Link to="/Pages" className="hover:text-blue-400">
            PAGES ▾
          </Link>

          <Link to="/Blogs" className="hover:text-blue-400">
            BLOG ▾
          </Link>

          <Link to="/Elements" className="hover:text-blue-400">
            ELEMENTS ▾
          </Link>

          <Link to="/Buy" className="font-semibold hover:text-blue-400">
            BUY NOW
          </Link>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* USER SECTION */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (user) {
                setLoading(true);
                setTimeout(() => {
                  navigate('/profile');
                  setLoading(false);
                }, 500);
              } else {
                openLogin();
              }
            }}
          >
            {user ? (
              <UserAvatar user={user} />
            ) : (
              <>
                <FaUser />
                <div className="text-xs leading-tight hidden sm:block">
                  <p>HELLO,</p>
                  <p className="font-semibold">SIGN IN</p>
                </div>
              </>
            )}
          </div>

          {/* WISHLIST */}
          <div className="flex items-center gap-2 cursor-pointer">
            <FaHeart /> <span className="text-xs">0</span>
          </div>

          {/* CART */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={openCart}
          >
            <FaShoppingCart />
            <div className="text-xs leading-tight hidden sm:block">
              <p>Cart</p>
              <p className="font-semibold">$0.00</p>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars size={20} />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="ml-auto w-64 bg-white p-6 flex flex-col gap-6 z-50">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end text-black text-xl"
            >
              <FaTimes />
            </button>

            {[
              { to: "/", label: "HOME ▾" },
              { to: "/shop", label: "SHOP ▾" },
              { to: "/Pages", label: "PAGES ▾" },
              { to: "/Blogs", label: "BLOG ▾" },
              { to: "/Elements", label: "ELEMENTS ▾" },
              { to: "/Buy", label: "BUY NOW" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 relative bg-blue-600 flex items-center">
          <button
            onClick={closeCart}
            className="text-white absolute left-4"
          >
            <FaChevronLeft />
          </button>

          <h2 className="text-lg text-white font-semibold mx-auto">
            Your Cart
          </h2>
        </div>

        <div className="p-4 flex flex-col items-center gap-4 mt-10">
          <FaShoppingBag className="text-gray-600 text-8xl border-2 rounded-lg p-6" />

          <p className="text-gray-600 text-sm font-bold">
            YOUR SHOPPING CART IS EMPTY!
          </p>

          <button
            onClick={handleContinueShopping}
            className="bg-blue-600 text-white text-[10px] font-bold px-4 py-2"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>

      {loading && <PageLoader />}

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
      />
    </div>
  );
}
