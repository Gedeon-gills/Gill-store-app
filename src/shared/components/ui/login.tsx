import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    username: "", 
    email: "", 
    phone: "", 
    password: "",
    UserType: "customer" as "admin"|"vendor"|"customer"
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isLoginView) {
        const response = await userService.LoginUser(loginData);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        onClose();
        navigate('/');
      } else {
        console.log('Sending registration data:', registerData);
        await userService.createUser(registerData);
        setIsLoginView(true);
        setError('Account created successfully! Please login.');
      }
    } catch (err: any) {
      console.error('Full error:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-[850px] max-h-[95vh] overflow-y-auto flex flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-400 hover:text-black z-10 bg-white rounded-full p-1"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Left Side */}
        <div className="bg-[#2b78ef] text-white p-6 sm:p-8 lg:p-12 lg:w-[40%] flex flex-col justify-center min-h-[200px] lg:min-h-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            {isLoginView ? "Login" : "Sign Up"}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed font-medium">
            {isLoginView
              ? "Get access to your Orders, Wishlist and Recommendations."
              : "Looks like you're new here! Sign up with your details to get started."}
          </p>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-8 lg:p-12 lg:w-[60%] bg-white">
          {error && (
            <div className={`mb-4 p-3 rounded text-xs sm:text-sm ${
              error.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {error}
            </div>
          )}
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="border-b border-gray-200">
              <input
                required
                type="email"
                placeholder="Enter Email address"
                value={isLoginView ? loginData.email : registerData.email}
                onChange={(e) => isLoginView 
                  ? setLoginData({...loginData, email: e.target.value})
                  : setRegisterData({...registerData, email: e.target.value})
                }
                className="w-full py-3 outline-none focus:border-blue-600 text-sm sm:text-base"
              />
            </div>

            {!isLoginView && (
              <>
                <div className="border-b border-gray-200">
                  <input
                    required
                    type="text"
                    placeholder="Enter Username"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                    className="w-full py-3 outline-none focus:border-blue-600 text-sm sm:text-base"
                  />
                </div>
                <div className="border-b border-gray-200">
                  <input
                    required
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    className="w-full py-3 outline-none focus:border-blue-600 text-sm sm:text-base"
                  />
                </div>
              </>
            )}

            <div className="relative border-b border-gray-200">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={isLoginView ? loginData.password : registerData.password}
                onChange={(e) => isLoginView 
                  ? setLoginData({...loginData, password: e.target.value})
                  : setRegisterData({...registerData, password: e.target.value})
                }
                className="w-full py-3 pr-12 outline-none focus:border-blue-600 text-sm sm:text-base"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 bg-[#2b78ef] text-white p-1.5 rounded-sm hover:bg-blue-700 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                <span className="text-xs sm:text-sm">Remember me</span>
              </label>
              {isLoginView && (
                <a
                  href="#"
                  className="text-[#2b78ef] font-bold hover:underline text-xs sm:text-sm"
                >
                  Lost your password?
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2b78ef] text-white font-bold py-3 sm:py-4 rounded-sm shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest text-xs sm:text-sm disabled:opacity-50 mt-6"
            >
              {loading ? 'Please wait...' : (isLoginView ? "Log In" : "Create Account")}
            </button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setShowPassword(false);
                }}
                className="text-[#2b78ef] text-xs sm:text-sm font-bold hover:underline"
              >
                {isLoginView
                  ? "New to Kapee? Create an account"
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
