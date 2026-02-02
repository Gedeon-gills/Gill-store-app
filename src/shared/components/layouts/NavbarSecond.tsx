import { FaSearch, FaShoppingBag, FaUser, FaHeart, FaBlog } from "react-icons/fa";
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
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
    }
  }
  return null;
};

export default function SecondNavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [loading, setLoading] = useState(false);
  
  const openLogin = () => setIsLoginOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  const closeLogin = () => setIsLoginOpen(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
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
  return (
    <nav className="bg-blue-600 py-2 sm:py-4 h-auto justify-baseline">
      <ul className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 mt-4 sm:mt-10">
        {/* LOGO */}
        <div className="text-white text-2xl sm:text-3xl font-bold">
          GillStore<span className="text-white">.</span>
        </div>

        {/* Desktop Search */}
        <div className="hidden sm:flex flex-1 mx-4">
          <input
            className="w-full h-12 px-6 rounded-l-full bg-white text-gray-600 text-sm focus:outline-none"
            placeholder="Search products..."
          />
          <select className="px-4 text-sm border-l bg-white text-gray-600">
            <option>All Categories</option>
          </select>
          <button className="bg-white px-5 rounded-r-full"><FaSearch /></button>
        </div>
        
        {/* ACTIONS */}
        <div className="flex items-center gap-4 sm:gap-6 order-2 sm:order-3">

          {/* BLOGS */}
          <li className="p-2 sm:p-1 rounded-lg sm:rounded-none hover:bg-blue-700 sm:hover:bg-transparent transition-colors">
            <Link to={"/blogs"} className="flex items-center gap-1 text-white text-xs sm:text-sm font-medium hover:opacity-80">
              <FaBlog className="text-lg sm:text-sm" />
              <span className="hidden sm:inline">BLOGS</span>
            </Link>
          </li>

          {/* FAVS */}
          <li className="p-2 sm:p-1 rounded-lg sm:rounded-none hover:bg-blue-700 sm:hover:bg-transparent transition-colors">
            <Link to={"/Favourites"} className="flex items-center gap-1 text-white text-xs sm:text-sm font-medium hover:opacity-80">
              <FaHeart className="text-lg sm:text-sm" />
              <span className="hidden sm:inline">FAVS</span>
            </Link>
          </li>

          {/* CARTS */}
          <li
            onClick={openCart}
            className="p-2 sm:p-1 rounded-lg sm:rounded-none hover:bg-blue-700 sm:hover:bg-transparent transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1 text-white text-xs sm:text-sm font-medium hover:opacity-80">
              <FaShoppingBag className="text-lg sm:text-sm" />
              <span className="hidden sm:inline">CARTS</span>
            </div>
          </li>
          
          <li
            className="relative text-white text-xs sm:text-sm font-medium cursor-pointer p-2 sm:p-1 rounded-lg sm:rounded-none hover:bg-blue-700 sm:hover:bg-transparent transition-colors"
          >
            {/* Account button */}
            {user ? (
              <div 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    navigate('/profile');
                    setLoading(false);
                  }, 500);
                }}
                className="flex items-center gap-2 hover:opacity-80"
              >
                <UserAvatar user={user} size="md" showUsername={true} />
              </div>
            ) : (
              <div 
                onClick={openLogin}
                className="flex items-center gap-2 hover:opacity-80"
              >
                <FaUser className="text-lg sm:text-sm" />
                <span className="hidden sm:inline">SIGN IN</span>
              </div>
            )}
          </li>
        </div>
      </ul>
      {loading && <PageLoader />}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onLoginSuccess={handleLoginSuccess} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} />
    </nav>
  );
}
