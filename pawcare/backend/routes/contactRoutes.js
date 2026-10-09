const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/adminMiddleware');

router.post('/', createContact);
router.get('/', authenticateUser, authorizeAdmin, getContacts);
router.put('/:id/read', authenticateUser, authorizeAdmin, markAsRead);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteContact);

module.exports = router;
