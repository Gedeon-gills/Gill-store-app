import { FaSearch, FaShoppingBag, FaUser, FaHeart, FaBlog, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../ui/cartsPopup";
import { useState, useEffect, useRef } from "react";
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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
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

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLoginSuccess = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const userData = JSON.parse(storedUser);
        
        // Try to fetch updated profile from backend to get latest photo
        try {
          const token = localStorage.getItem('token') || localStorage.getItem('authToken');
          if (token && token.startsWith('eyJ')) {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/auth/me`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            if (response.ok) {
              const profileData = await response.json();
              const updatedUser = { ...userData, profile: profileData.data.user.photo };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              setUser(updatedUser);
              return;
            }
          }
        } catch (error) {
          console.log('Could not fetch profile, using stored data');
        }
        
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setShowUserMenu(false);
      navigate('/');
    }
  };

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'admin': return '/admin';
      case 'vendor': return '/vendor/dashboard';
      case 'customer': return '/orders';
      default: return '/orders';
    }
  };

  const getDashboardLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin Dashboard';
      case 'vendor': return 'Vendor Dashboard';
      case 'customer': return 'Order Management';
      default: return 'Order Management';
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
            ref={userMenuRef}
          >
            {/* Account button */}
            {user ? (
              <div>
                <div 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:opacity-80"
                >
                  <UserAvatar user={user} size="md" showUsername={true} />
                  <FaChevronDown className="text-xs" />
                </div>
                
                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate('/profile');
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <FaUser className="text-sm" />
                        My Account
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          navigate(getDashboardRoute(user.role));
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {getDashboardLabel(user.role)}
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
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
