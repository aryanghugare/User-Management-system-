import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile, changePassword } from '../services/authService';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiSave, FiX, FiEdit2, FiCalendar, FiShield } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const validateProfile = () => {
    const newErrors = {};
    
    if (!profileData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (profileData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!profileData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, number, and special character';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfile()) return;
    
    setLoading(true);
    try {
      const response = await updateProfile(profileData);
      updateUser(response.data.user);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setLoading(true);
    try {
      const response = await changePassword(passwordData);
      localStorage.setItem('token', response.data.token);
      toast.success('Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setProfileData({
      fullName: user?.fullName || '',
      email: user?.email || ''
    });
    setErrors({});
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex justify-center items-center mx-auto mb-4 text-white text-4xl">
            <FiUser />
          </div>
          <h1 className="text-gray-900 text-2xl font-bold mb-2">{user?.fullName}</h1>
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold uppercase ${
            user?.role === 'admin' 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
              : 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
          }`}>
            {user?.role}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="flex items-center gap-2 text-gray-900 text-xl font-semibold m-0">
                <FiUser className="text-primary-500" />
                Profile Information
              </h2>
              {!isEditing && (
                <button 
                  className="bg-gray-100 border-none w-10 h-10 rounded-xl flex justify-center items-center cursor-pointer text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit2 />
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-gray-800 font-medium text-sm">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    className={`input-field ${errors.fullName ? 'error' : ''}`}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-800 font-medium text-sm">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className={`input-field ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="flex gap-4 justify-end mt-4">
                  <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                    <FiX /> Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <Spinner size="small" /> : <><FiSave /> Save Changes</>}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <FiUser className="text-primary-500 text-xl" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Full Name</span>
                    <span className="text-gray-800 font-medium">{user?.fullName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <FiMail className="text-primary-500 text-xl" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Email Address</span>
                    <span className="text-gray-800 font-medium">{user?.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <FiShield className="text-primary-500 text-xl" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Role</span>
                    <span className="text-gray-800 font-medium capitalize">{user?.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <FiCalendar className="text-primary-500 text-xl" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Last Login</span>
                    <span className="text-gray-800 font-medium">{formatDate(user?.lastLogin)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="flex items-center gap-2 text-gray-900 text-xl font-semibold m-0">
                <FiLock className="text-primary-500" />
                Change Password
              </h2>
              {!isChangingPassword && (
                <button 
                  className="bg-gray-100 border-none w-10 h-10 rounded-xl flex justify-center items-center cursor-pointer text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
                  onClick={() => setIsChangingPassword(true)}
                >
                  <FiEdit2 />
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="currentPassword" className="text-gray-800 font-medium text-sm">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`input-field ${errors.currentPassword ? 'error' : ''}`}
                  />
                  {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="newPassword" className="text-gray-800 font-medium text-sm">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={`input-field ${errors.newPassword ? 'error' : ''}`}
                  />
                  {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmPassword" className="text-gray-800 font-medium text-sm">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="flex gap-4 justify-end mt-4">
                  <button type="button" className="btn btn-secondary" onClick={cancelPasswordChange}>
                    <FiX /> Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <Spinner size="small" /> : <><FiSave /> Update Password</>}
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-gray-600 leading-relaxed">
                Click the edit button to change your password. Make sure to use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
