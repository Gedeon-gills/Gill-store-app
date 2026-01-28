import { FaSearch, FaShoppingBag, FaUser, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartDrawer from "../ui/cartsPopup";
import { useState } from "react";
import LoginModal from "../ui/login";
import RegisterModal from "../ui/register";
export default function SecondNavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const openLogin = () => setIsLoginOpen(true);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  const closeLogin = () => setIsLoginOpen(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  return (
    <nav className="bg-blue-600 py-4 h-30  justify-baseline">
      <ul className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6 mt-10">
        {/* LOGO */}
        <li className="text-white text-2xl font-bold tracking-wide">
          B-DIFFERENT
        </li>

        {/* SEARCH BAR */}
        <li className="flex items-center bg-white rounded-full px-5 py-2 flex-1 max-w-xl">
          <input
            type="text"
            placeholder="clothes..."
            className="flex-1 outline-none text-sm text-gray-700"
          />
          <FaSearch className="text-gray-500 text-sm cursor-pointer" />
        </li>
        {/* FAVS */}
        <li className="flex items-center gap-1 text-white text-sm font-medium cursor-pointer hover:opacity-80">
          <FaHeart className="text-sm" />
          <Link to={"/Favourites"}>FAVS</Link>
        </li>

        {/* CARTS */}
        <li
          onClick={openCart}
          className="flex items-center gap-1 text-white text-sm font-medium cursor-pointer hover:opacity-80"
        >
          <FaShoppingBag className="text-sm" />
          CARTS
        </li>
        <li
          onMouseEnter={() => setIsAccount(true)}
          className="relative text-white text-sm font-medium cursor-pointer"
        >
          {/* Account button */}
          <div className="flex items-center gap-1 hover:opacity-80">
            <FaUser className="text-sm" />
            ACCOUNT
          </div>

          {/* Dropdown */}
          {isAccount && (
            <ul
              onMouseLeave={() => setIsAccount(false)}
              className="absolute top-full left-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden"
            >
              <li
                onClick={openLogin}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                SIGN-IN
              </li>
              <li
                onClick={openRegister}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                Create Account
              </li>
            </ul>
          )}
        </li>
      </ul>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
    </nav>
  );
}
