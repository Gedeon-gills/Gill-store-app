import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/userService";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isRegisterView, setIsRegisterView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: (data) => {
      console.log(data);
    },

    // Step 4: Handle errors
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
  interface userOne {
    username: string;
    email: string;
    password: string;
    phone: string;
    rememberMe: boolean;
  }
  const [formData, setFormData] = useState<userOne>({
    username: "",
    email: "",
    phone: "",
    password: "",
    rememberMe: false,
  });
  const [userIntent, setUserIntent] = useState<"customer" | "vendor" | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [skipProfile, setSkipProfile] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (
      !isRegisterView &&
      formData.phone &&
      !/^\d{10,15}$/.test(formData.phone)
    )
      newErrors.phone = "Phone number must be 10-15 digits";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Handle successful registration/login
    console.log("Form Data:", formData);
    // onClose();

    console.log(formData);

    mutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      UserType: userIntent || "customer",
      profile: skipProfile ? undefined : profileImage || undefined
    });

    // navigate("/"); // Redirect after success
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
            {isRegisterView ? "Login" : "Sign Up"}
          </h2>
          <p className="text-lg opacity-90 leading-relaxed font-medium">
            {isRegisterView
              ? "Get access to your Orders, Wishlist and Recommendations."
              : "Looks like you're new here! Sign up with your details to get started."}
          </p>
        </div>

        {/* Right Side */}
        <div className="p-12 md:w-[60%] bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username / Email */}
            <div className="border-b border-gray-200">
              <input
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter Username"
                className="w-full py-3 outline-none focus:border-blue-600 text-sm"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="border-b border-gray-200">
              <input
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Email"
                className="w-full py-3 outline-none focus:border-blue-600 text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone for Sign Up */}
            {!isRegisterView && (
              <div className="border-b border-gray-200">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="w-full py-3 outline-none focus:border-blue-600 text-sm"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            )}

            {/* Profile Image Upload */}
            {!isRegisterView && !skipProfile && (
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
                      type="url"
                      placeholder="Enter image URL"
                      value={profileImage}
                      onChange={(e) => setProfileImage(e.target.value)}
                      className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600"
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
            {!isRegisterView && (
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
            )}

            {/* Password */}
            <div className="relative border-b border-gray-200">
              <input
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full py-3 outline-none focus:border-blue-600 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 bg-[#2b78ef] text-white p-1.5 rounded-sm hover:bg-blue-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="accent-blue-600 w-4 h-4"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2b78ef] text-white font-bold py-4 rounded-sm shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest text-xs"
            >
              {isRegisterView ? "LOGIN" : "SIGN-UP"}
            </button>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsRegisterView(!isRegisterView);
                  setShowPassword(false);
                  setErrors({});
                }}
                className="text-[#2b78ef] text-sm font-bold hover:underline"
              >
                {isRegisterView
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

export default RegisterModal;
