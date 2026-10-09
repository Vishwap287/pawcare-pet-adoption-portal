const express = require('express');
const router = express.Router();
const {
  getPets,
  getPetById,
  getPetsByCategory,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/petController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/adminMiddleware');

router.get('/', getPets);
router.get('/category/:category', getPetsByCategory);
router.get('/:id', getPetById);
router.post('/', authenticateUser, authorizeAdmin, createPet);
router.put('/:id', authenticateUser, authorizeAdmin, updatePet);
router.delete('/:id', authenticateUser, authorizeAdmin, deletePet);

module.exports = router;
