import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit } from "react-icons/fa";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";

interface User {
  username: string;
  email: string;
  profile?: string;
  UserType: string;
}

export default function Profile() {
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser || storedUser === "undefined") {
    navigate("/");
    return;
  }

  // Defer setState → avoids synchronous effect warning
  Promise.resolve().then(() => {
    try {
      const user = JSON.parse(storedUser);
      setLocalUser(user); // SAFE
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      navigate("/");
    }
  });
}, [navigate]);

  // Fetch fresh user data from backend
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
    enabled: !!localUser,
    staleTime: 5 * 60 * 1000,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      const updatedUser = { ...localUser, ...data };
      setLocalUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('userUpdated'));
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setUploading(false);
    },
    onError: () => setUploading(false)
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Convert file to base64 or URL for the API
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileMutation.mutate({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: userService.changePassword,
    onSuccess: () => {
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '' });
      alert('Password changed successfully!');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      alert(error.response?.data?.message || 'Failed to change password');
    }
  });

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert('Please fill in all fields');
      return;
    }
    changePasswordMutation.mutate({
      passwordCurrent: passwordData.currentPassword,
      password: passwordData.newPassword
    });
  };

  const handleDeleteAccount = () => {
    // Delete account functionality not implemented
    alert('Delete account functionality is not available');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear();
    navigate("/");
  };

  if (!localUser) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading profile</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Use backend data if available, fallback to localStorage
  const displayUser = user || localUser;

  if (!displayUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
                {displayUser.profile ? (
                  <img
                    src={displayUser.profile}
                    alt={displayUser.username}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-100"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-blue-600 flex items-center justify-center border-4 border-blue-100">
                    <FaUser className="text-white text-4xl sm:text-5xl" />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {displayUser.username}
                </h1>
                <p className="text-gray-600 mb-4">{displayUser.email}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FaEdit size={16} />
                    {uploading ? 'Uploading...' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{displayUser.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{displayUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">User Type</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg capitalize">{displayUser.UserType}</p>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                >
                  Change Password
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border">
                  Privacy Settings
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border">
                  Notification Preferences
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full text-left p-3 rounded-lg hover:bg-red-50 transition-colors border border-red-200 text-red-600"
                >
                  Delete Account
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                disabled={changePasswordMutation.isPending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {changePasswordMutation.isPending ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Delete Account</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}