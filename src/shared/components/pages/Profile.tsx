import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit } from "react-icons/fa";
import { adminAPI } from "../../services/adminAPI";
import Header from "../forms/Headers";
import Footer from "../forms/Footer";

interface User {
  _id?: string;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  profile?: string;
  role: string;
  UserType?: string;
  isActive?: boolean;
  createdAt?: string;
}

export default function Profile() {
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [editData, setEditData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      
      try {
        const formData = new FormData();
        formData.append('photo', file);
        
        const response = await adminAPI.updateUserProfile(formData);
        console.log('Upload response:', response);
        
        // Update with backend photo URL
        const backendPhotoUrl = response.data?.user?.photo;
        if (backendPhotoUrl) {
          const updatedUser = { ...localUser, profile: backendPhotoUrl, photo: backendPhotoUrl };
          setLocalUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          window.dispatchEvent(new Event('userUpdated'));
          alert('Photo updated successfully!');
        } else {
          alert('Photo uploaded but URL not received from server');
        }
      } catch (error: any) {
        console.error('Error uploading image:', error);
        if (error.message.includes('authentication token')) {
          alert('Please log in again to update your photo');
        } else {
          alert('Failed to upload image. Please try again.');
        }
      } finally {
        setUploading(false);
      }
    }
  };

  const handleEditProfile = () => {
    setEditData({
      name: displayUser?.name || displayUser?.username || '',
      email: displayUser?.email || '',
      phone: displayUser?.phone || ''
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', editData.name);
      
      await adminAPI.updateUserProfile(formData);
      const updatedUser = { ...localUser, ...editData };
      setLocalUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('userUpdated'));
      setShowEditModal(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await adminAPI.changePassword({
        passwordCurrent: passwordData.currentPassword,
        password: passwordData.newPassword
      });
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '' });
      alert('Password changed successfully!');
    } catch (error: any) {
      console.error('Error changing password:', error);
      if (error.message.includes('authentication token')) {
        alert('Please log in again to change your password');
      } else {
        alert('Failed to change password. Please check your current password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    alert('Delete account functionality is not available - backend endpoint not implemented');
    setShowDeleteModal(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser || storedUser === "undefined") {
    navigate("/");
    return;
  }

  // Defer setState → avoids synchronous effect warning
  Promise.resolve().then(async () => {
    try {
      const user = JSON.parse(storedUser);
      setLocalUser(user);
      
      // Fetch latest profile from database to get current photo
      try {
        const profileResponse = await adminAPI.getUserProfile();
        const updatedUser = { ...user, profile: profileResponse.data.user.photo, photo: profileResponse.data.user.photo };
        setLocalUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.log('Could not fetch latest profile, using stored data');
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      navigate("/");
    }
  });
}, [navigate]);

  // Use localStorage data directly instead of fetching from backend
  const displayUser = localUser;

  if (!displayUser) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please log in to view your profile</p>
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
                  {displayUser.name || displayUser.username}
                </h1>
                <p className="text-gray-600 mb-4">{displayUser.email}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FaEdit size={16} />
                    {uploading ? 'Uploading...' : 'Change Photo'}
                  </button>
                  <button 
                    onClick={handleEditProfile}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit size={16} />
                    Edit Profile
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
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{displayUser.name || displayUser.username || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{displayUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{displayUser.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Account Type</label>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded-lg capitalize">{displayUser.role || displayUser.UserType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Account Status</label>
                  <p className={`p-3 rounded-lg capitalize ${displayUser.isActive !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {displayUser.isActive !== false ? 'Active' : 'Inactive'}
                  </p>
                </div>
                {displayUser.createdAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Member Since</label>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {new Date(displayUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
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
      
      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
      
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
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update'}
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