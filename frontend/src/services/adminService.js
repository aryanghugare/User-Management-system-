import api from './api';

export const getAllUsers = async (page = 1, limit = 10, search = '') => {
  const response = await api.get(`/admin/users?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/admin/users/${userId}`);
  return response.data;
};

export const activateUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/activate`);
  return response.data;
};

export const deactivateUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/deactivate`);
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await api.put(`/admin/users/${userId}/role`, { role });
  return response.data;
};
