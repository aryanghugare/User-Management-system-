import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers, activateUser, deactivateUser } from '../services/adminService';
import { toast } from 'react-toastify';
import { FiUsers, FiSearch, FiUserCheck, FiUserX, FiRefreshCw } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0
  });
  
  const [modal, setModal] = useState({
    isOpen: false,
    type: '',
    userId: null,
    userName: ''
  });

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await getAllUsers(page, 10, searchQuery);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const openModal = (type, userId, userName) => {
    setModal({
      isOpen: true,
      type,
      userId,
      userName
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: '',
      userId: null,
      userName: ''
    });
  };

  const handleUserAction = async () => {
    setActionLoading(modal.userId);
    try {
      if (modal.type === 'activate') {
        await activateUser(modal.userId);
        toast.success(`${modal.userName} has been activated`);
      } else {
        await deactivateUser(modal.userId);
        toast.success(`${modal.userName} has been deactivated`);
      }
      fetchUsers(pagination.currentPage);
    } catch (error) {
      const message = error.response?.data?.message || 'Action failed';
      toast.error(message);
    } finally {
      setActionLoading(null);
      closeModal();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl text-primary-500 bg-primary-500/10 p-3 rounded-xl">
              <FiUsers />
            </div>
            <div>
              <h1 className="text-gray-900 text-2xl font-bold m-0">User Management</h1>
              <p className="text-gray-500 m-0">Manage all users in the system</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-6 py-4 rounded-xl flex flex-col items-center">
            <span className="text-3xl font-bold">{pagination.totalUsers}</span>
            <span className="text-sm opacity-90">Total Users</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
            <form onSubmit={handleSearch} className="flex gap-3 flex-1 max-w-lg">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pl-11 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-primary-500 transition-all duration-300"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
            
            <button 
              className="btn btn-secondary"
              onClick={() => fetchUsers(pagination.currentPage)}
            >
              <FiRefreshCw />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Spinner size="large" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FiUsers className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-800 font-semibold mb-2">No users found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wide border-b border-gray-100">Email</th>
                      <th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wide border-b border-gray-100">Full Name</th>
                      <th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wide border-b border-gray-100">Role</th>
                      <th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wide border-b border-gray-100">Status</th>
                      <th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wide border-b border-gray-100">Created</th>
                      <th className="text-left p-4 bg-gray-50 text-gray-500 font-semibold text-sm uppercase tracking-wide border-b border-gray-100">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 border-b border-gray-100 text-primary-500 font-medium">{user.email}</td>
                        <td className="p-4 border-b border-gray-100">{user.fullName}</td>
                        <td className="p-4 border-b border-gray-100">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            user.role === 'admin' 
                              ? 'bg-yellow-400/15 text-yellow-600' 
                              : 'bg-primary-500/15 text-primary-500'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 border-b border-gray-100">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            user.status === 'active' 
                              ? 'bg-green-500/15 text-green-600' 
                              : 'bg-red-500/15 text-red-500'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 border-b border-gray-100 text-gray-600">{formatDate(user.createdAt)}</td>
                        <td className="p-4 border-b border-gray-100">
                          <div className="flex gap-2">
                            {user.status === 'active' ? (
                              <button
                                className="w-9 h-9 border-none rounded-lg bg-red-500/15 text-red-500 flex justify-center items-center cursor-pointer text-lg hover:bg-red-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => openModal('deactivate', user._id, user.fullName)}
                                disabled={actionLoading === user._id}
                                title="Deactivate user"
                              >
                                {actionLoading === user._id ? (
                                  <Spinner size="small" />
                                ) : (
                                  <FiUserX />
                                )}
                              </button>
                            ) : (
                              <button
                                className="w-9 h-9 border-none rounded-lg bg-green-500/15 text-green-600 flex justify-center items-center cursor-pointer text-lg hover:bg-green-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => openModal('activate', user._id, user.fullName)}
                                disabled={actionLoading === user._id}
                                title="Activate user"
                              >
                                {actionLoading === user._id ? (
                                  <Spinner size="small" />
                                ) : (
                                  <FiUserCheck />
                                )}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onConfirm={handleUserAction}
        title={modal.type === 'activate' ? 'Activate User' : 'Deactivate User'}
        message={
          modal.type === 'activate'
            ? `Are you sure you want to activate ${modal.userName}? They will be able to access the system.`
            : `Are you sure you want to deactivate ${modal.userName}? They will no longer be able to access the system.`
        }
        confirmText={modal.type === 'activate' ? 'Activate' : 'Deactivate'}
        type={modal.type === 'activate' ? 'default' : 'danger'}
      />
    </div>
  );
};

export default AdminDashboard;
