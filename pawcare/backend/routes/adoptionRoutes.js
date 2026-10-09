const express = require('express');
const router = express.Router();
const {
  createAdoption,
  getMyAdoptions,
  getAdoptions,
  getAdoptionById,
  updateAdoptionStatus,
} = require('../controllers/adoptionController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/adminMiddleware');

router.post('/', authenticateUser, createAdoption);
router.get('/my', authenticateUser, getMyAdoptions);
router.get('/', authenticateUser, authorizeAdmin, getAdoptions);
router.get('/:id', authenticateUser, getAdoptionById);
router.put('/:id/status', authenticateUser, authorizeAdmin, updateAdoptionStatus);

module.exports = router;
