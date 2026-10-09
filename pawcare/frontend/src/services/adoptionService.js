import api from './api';

const createAdoption = (data) => api.post('/adoptions', data).then((res) => res.data);
const getMyAdoptions = () => api.get('/adoptions/my').then((res) => res.data);
const getAdoptions = (params) => api.get('/adoptions', { params }).then((res) => res.data);
const getAdoptionById = (id) => api.get(`/adoptions/${id}`).then((res) => res.data);
const updateStatus = (id, data) => api.put(`/adoptions/${id}/status`, data).then((res) => res.data);

export default { createAdoption, getMyAdoptions, getAdoptions, getAdoptionById, updateStatus };
