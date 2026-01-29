import { FaSearch, FaShoppingBag, FaUser, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../ui/cartsPopup";
import { useState } from "react";
import LoginModal from "../ui/login";
import RegisterModal from "../ui/register";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";
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
  const logout = (queryClient: QueryClient) => {
    localStorage.removeItem("token");
    queryClient.clear();
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleLogout() {
    logout(queryClient);
    navigate("/shop");
  }
  return (
    <nav className="bg-blue-600 py-2 sm:py-4 h-auto justify-baseline">
      <ul className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 mt-4 sm:mt-10">
        {/* LOGO */}
        <li className="text-white text-xl sm:text-2xl font-bold tracking-wide order-1">
          B-DIFFERENT
        </li>

        {/* SEARCH BAR */}
        <li className="flex items-center bg-white rounded-full px-3 sm:px-5 py-2 flex-1 w-full sm:max-w-xl order-3 sm:order-2">
          <input
            type="text"
            placeholder="clothes..."
            className="flex-1 outline-none text-xs sm:text-sm text-gray-700"
          />
          <FaSearch className="text-gray-500 text-xs sm:text-sm cursor-pointer" />
        </li>
        
        {/* ACTIONS */}
        <div className="flex items-center gap-4 sm:gap-6 order-2 sm:order-3">
          {/* FAVS */}
          <li className="flex items-center gap-1 text-white text-xs sm:text-sm font-medium cursor-pointer hover:opacity-80">
            <FaHeart className="text-sm" />
            <Link to={"/Favourites"} className="hidden sm:inline">FAVS</Link>
          </li>

          {/* CARTS */}
          <li
            onClick={openCart}
            className="flex items-center gap-1 text-white text-xs sm:text-sm font-medium cursor-pointer hover:opacity-80"
          >
            <FaShoppingBag className="text-sm" />
            <span className="hidden sm:inline">CARTS</span>
          </li>
          
          <li
            onMouseEnter={() => setIsAccount(true)}
            className="relative text-white text-xs sm:text-sm font-medium cursor-pointer"
          >
            {/* Account button */}
            <div className="flex items-center gap-1 hover:opacity-80">
              <FaUser className="text-sm" />
              <span className="hidden sm:inline">ACCOUNT</span>
            </div>

            {/* Dropdown */}
            {isAccount && (
              <ul
                onMouseLeave={() => setIsAccount(false)}
                className="absolute top-full right-0 sm:left-0 mt-2 w-32 sm:w-40 bg-white text-black shadow-lg rounded-md overflow-hidden z-50"
              >
                <li
                  onClick={openLogin}
                  className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm"
                >
                  ACCOUNT
                </li>
                <li
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-2 hover:bg-red-400 cursor-pointer text-xs sm:text-sm"
                >
                  LOG OUT
                </li>
              </ul>
            )}
          </li>
        </div>
      </ul>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
    </nav>
  );
}
