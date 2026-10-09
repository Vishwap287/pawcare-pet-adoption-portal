const { User, Pet } = require('../models');

// @desc  Get all users (admin)
// @route GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { role: 'user' }, order: [['createdAt', 'DESC']] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single user
// @route GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update user profile (self or admin)
// @route PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && String(req.user.id) !== String(req.params.id)) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const allowedFields = ['name', 'phone', 'address', 'city', 'state', 'pincode', 'profileImage'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (req.user.role === 'admin' && req.body.isBlocked !== undefined) {
      updates.isBlocked = req.body.isBlocked;
    }

    await user.update(updates);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Delete user (admin)
// @route DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Add pet to favorites
// @route POST /api/users/favorites/:petId
const addFavorite = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.petId);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    const user = await User.findByPk(req.user.id);
    await user.addFavorite(pet);

    const favorites = await user.getFavorites({ attributes: ['id'] });
    res.json(favorites.map((f) => String(f.id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Remove pet from favorites
// @route DELETE /api/users/favorites/:petId
const removeFavorite = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.petId);
    const user = await User.findByPk(req.user.id);
    if (pet) await user.removeFavorite(pet);

    const favorites = await user.getFavorites({ attributes: ['id'] });
    res.json(favorites.map((f) => String(f.id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get favorite pets
// @route GET /api/users/favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const favorites = await user.getFavorites({ order: [['createdAt', 'DESC']] });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFavorite,
  removeFavorite,
  getFavorites,
};
