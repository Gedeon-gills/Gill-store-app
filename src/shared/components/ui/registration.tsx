import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react"; // Added EyeOff
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);

  // 1. Create state to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-[850px] flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-black z-10"
        >
          <X size={24} />
        </button>

        {/* Left Side */}
        <div className="bg-[#2b78ef] text-white p-12 md:w-[40%] flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">
            {isLoginView ? "Login" : "Sign Up"}
          </h2>
          <p className="text-lg opacity-90 leading-relaxed font-medium">
            {isLoginView
              ? "Get access to your Orders, Wishlist and Recommendations."
              : "Looks like you're new here! Sign up with your details to get started."}
          </p>
        </div>

        {/* Right Side */}
        <div className="p-12 md:w-[60%] bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="border-b border-gray-200">
              <input
                required
                type="text"
                placeholder="Enter Username/Email address"
                className="w-full py-3 outline-none focus:border-blue-600 text-sm"
              />
            </div>

            {!isLoginView && (
              <div className="border-b border-gray-200">
                <input
                  required
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="w-full py-3 outline-none focus:border-blue-600 text-sm"
                />
              </div>
            )}

            <div className="relative border-b border-gray-200">
              {/* 2. Change 'type' dynamically based on showPassword state */}
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full py-3 outline-none focus:border-blue-600 text-sm"
              />

              {/* 3. Toggle showPassword on click */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 bg-[#2b78ef] text-white p-1.5 rounded-sm hover:bg-blue-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                <input type="checkbox" className="accent-blue-600 w-4 h-4" />{" "}
                Remember me
              </label>
              {isLoginView && (
                <a
                  href="#"
                  className="text-[#2b78ef] font-bold hover:underline"
                >
                  Lost your password?
                </a>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2b78ef] text-white font-bold py-4 rounded-sm shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest text-xs"
            >
              {isLoginView ? "Log In" : "Continue"}
            </button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsLoginView(!isLoginView);
                  setShowPassword(false); // Reset eye icon when switching views
                }}
                className="text-[#2b78ef] text-sm font-bold hover:underline"
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
