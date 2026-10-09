import api from './api';

const getUsers = () => api.get('/users').then((res) => res.data);
const getUserById = (id) => api.get(`/users/${id}`).then((res) => res.data);
const updateUser = (id, data) => api.put(`/users/${id}`, data).then((res) => res.data);
const deleteUser = (id) => api.delete(`/users/${id}`).then((res) => res.data);

export default { getUsers, getUserById, updateUser, deleteUser };
