import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
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
  const [userIntent, setUserIntent] = useState<"customer" | "vendor" | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [skipProfile, setSkipProfile] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isLoginView) {
        const response = await userService.LoginUser(loginData);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLoginSuccess?.(); // Notify parent component
        onClose();
        navigate('/');
      } else {
        console.log('Sending registration data:', registerData);
        const response = await userService.createUser({
          ...registerData,
          UserType: userIntent || "customer",
          profile: skipProfile ? undefined : profileImage || undefined
        });
        // If registration returns user data, store it
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          onLoginSuccess?.(); // Update navbar
        }
        setIsLoginView(true);
        setError('Account created successfully! Please login.');
      }
    } catch (err: unknown) {
      const error = err as Error & { response?: { status?: number } };
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      
      // Handle different error scenarios with user-friendly messages
      if (error.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else if (error.response?.status === 404) {
        setError('Account not found. Please check your email or create an account.');
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (error.message === 'Network Error') {
        setError('Network error. Please check your connection.');
      } else {
        setError('Invalid email or password. Please try again.');
      }
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

                {/* Profile Image Upload */}
                {!skipProfile && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Picture (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <FaUser className="text-gray-400 text-xl" />
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="skipProfile"
                        checked={skipProfile}
                        onChange={(e) => setSkipProfile(e.target.checked)}
                        className="accent-blue-600"
                      />
                      <label htmlFor="skipProfile" className="text-sm text-gray-600">
                        Skip for now, I'll add it later
                      </label>
                    </div>
                  </div>
                )}

                {/* User Intent Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to do?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserIntent("customer")}
                      className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                        userIntent === "customer"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      Purchase Products
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserIntent("vendor")}
                      className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                        userIntent === "vendor"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      Sell Products
                    </button>
                  </div>
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
                  ? "New to Gillstore? Create an account"
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
