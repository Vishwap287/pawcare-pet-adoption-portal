import api from './api';

const getPets = (params) => api.get('/pets', { params }).then((res) => res.data);
const getPetById = (id) => api.get(`/pets/${id}`).then((res) => res.data);
const getPetsByCategory = (category) => api.get(`/pets/category/${category}`).then((res) => res.data);
const createPet = (data) => api.post('/pets', data).then((res) => res.data);
const updatePet = (id, data) => api.put(`/pets/${id}`, data).then((res) => res.data);
const deletePet = (id) => api.delete(`/pets/${id}`).then((res) => res.data);

const addFavorite = (petId) => api.post(`/users/favorites/${petId}`).then((res) => res.data);
const removeFavorite = (petId) => api.delete(`/users/favorites/${petId}`).then((res) => res.data);
const getFavorites = () => {
  const token = localStorage.getItem('pawcare_token');
  if (!token) return Promise.resolve([]);
  return api
    .get('/users/favorites')
    .then((res) => res.data)
    .catch((err) => {
      if (err.response?.status === 401) return [];
      throw err;
    });
};

export default {
  getPets,
  getPetById,
  getPetsByCategory,
  createPet,
  updatePet,
  deletePet,
  addFavorite,
  removeFavorite,
  getFavorites,
};
