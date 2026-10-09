const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/adminMiddleware');

router.get('/favorites', authenticateUser, getFavorites);
router.post('/favorites/:petId', authenticateUser, addFavorite);
router.delete('/favorites/:petId', authenticateUser, removeFavorite);

router.get('/', authenticateUser, authorizeAdmin, getUsers);
router.get('/:id', authenticateUser, getUserById);
router.put('/:id', authenticateUser, updateUser);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteUser);

module.exports = router;
