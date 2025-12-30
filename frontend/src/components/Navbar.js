import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';
import { toast } from 'react-toastify';
import { FiUser, FiLogOut, FiUsers, FiHome } from 'react-icons/fi';

const Navbar = () => {
  const { user, isAdmin, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      logoutUser();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-primary-500 to-purple-500 py-3 px-6 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <Link to="/" className="flex items-center gap-2 text-white no-underline text-xl font-bold">
          <FiHome className="text-2xl" />
          <span>User Management</span>
        </Link>

        <div className="flex items-center gap-6 flex-wrap">
          {isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className="flex items-center gap-2 text-white/90 no-underline font-medium px-4 py-2 rounded-lg hover:bg-white/15 hover:text-white transition-all duration-300"
            >
              <FiUsers />
              <span>Dashboard</span>
            </Link>
          )}
          
          <Link 
            to="/profile" 
            className="flex items-center gap-2 text-white/90 no-underline font-medium px-4 py-2 rounded-lg hover:bg-white/15 hover:text-white transition-all duration-300"
          >
            <FiUser />
            <span>Profile</span>
          </Link>

          <div className="flex flex-col items-end ml-4">
            <span className="text-white font-semibold text-sm">{user?.fullName}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${
              user?.role === 'admin' 
                ? 'bg-yellow-400 text-gray-900' 
                : 'bg-white/20 text-white'
            }`}>
              {user?.role}
            </span>
          </div>

          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 bg-white/15 text-white border-none px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-white/25 transition-all duration-300"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
