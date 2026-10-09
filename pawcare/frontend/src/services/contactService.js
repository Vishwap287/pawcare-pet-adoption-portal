import api from './api';

const sendMessage = (data) => api.post('/contact', data).then((res) => res.data);
const getMessages = () => api.get('/contact').then((res) => res.data);
const markAsRead = (id) => api.put(`/contact/${id}/read`).then((res) => res.data);
const deleteMessage = (id) => api.delete(`/contact/${id}`).then((res) => res.data);

export default { sendMessage, getMessages, markAsRead, deleteMessage };
