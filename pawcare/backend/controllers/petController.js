const { Op } = require('sequelize');
const { Pet } = require('../models');

// @desc  Get all pets with search/filter/sort/pagination
// @route GET /api/pets
const getPets = async (req, res) => {
  try {
    const {
      search,
      category,
      breed,
      minAge,
      maxAge,
      gender,
      size,
      location,
      status,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { breed: { [Op.like]: `%${search}%` } },
      ];
    }
    if (category) where.category = category;
    if (breed) where.breed = { [Op.like]: `%${breed}%` };
    if (gender) where.gender = gender;
    if (size) where.size = size;
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (status) where.status = status;
    if (minAge || maxAge) {
      where.age = {};
      if (minAge) where.age[Op.gte] = Number(minAge);
      if (maxAge) where.age[Op.lte] = Number(maxAge);
    }
    if ((minPrice !== undefined && minPrice !== '') || (maxPrice !== undefined && maxPrice !== '')) {
      where.price = {};
      if (minPrice !== undefined && minPrice !== '') where.price[Op.gte] = Number(minPrice);
      if (maxPrice !== undefined && maxPrice !== '') where.price[Op.lte] = Number(maxPrice);
    }

    let order = [['createdAt', 'DESC']];
    if (sort === 'oldest') order = [['createdAt', 'ASC']];
    if (sort === 'name_asc') order = [['name', 'ASC']];
    if (sort === 'name_desc') order = [['name', 'DESC']];
    if (sort === 'price_asc') order = [['price', 'ASC']];
    if (sort === 'price_desc') order = [['price', 'DESC']];

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));

    try {
      const { rows: pets, count: total } = await Pet.findAndCountAll({
        where,
        order,
        limit: limitNum,
        offset: (pageNum - 1) * limitNum,
      });

      return res.json({
        pets,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      });
    } catch (queryErr) {
      if (queryErr.message && (queryErr.message.includes('price') || queryErr.message.includes('Unknown column'))) {
        try {
          await Pet.sequelize.query("ALTER TABLE `pets` ADD COLUMN `price` INT NOT NULL DEFAULT 0 AFTER `color`");
          const { rows: retryPets, count: retryTotal } = await Pet.findAndCountAll({
            where,
            order,
            limit: limitNum,
            offset: (pageNum - 1) * limitNum,
          });
          return res.json({
            pets: retryPets,
            total: retryTotal,
            page: pageNum,
            pages: Math.ceil(retryTotal / limitNum),
          });
        } catch (e) {}
      }
      throw queryErr;
    }
  } catch (error) {
    console.error('getPets error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single pet
// @route GET /api/pets/:id
const getPetById = async (req, res) => {
  try {
    let pet;
    try {
      pet = await Pet.findByPk(req.params.id);
    } catch (err) {
      if (err.message && (err.message.includes('price') || err.message.includes('Unknown column'))) {
        await Pet.sequelize.query("ALTER TABLE `pets` ADD COLUMN `price` INT NOT NULL DEFAULT 0 AFTER `color`");
        pet = await Pet.findByPk(req.params.id);
      } else {
        throw err;
      }
    }
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get pets by category
// @route GET /api/pets/category/:category
const getPetsByCategory = async (req, res) => {
  try {
    let pets;
    try {
      pets = await Pet.findAll({ where: { category: req.params.category } });
    } catch (err) {
      if (err.message && (err.message.includes('price') || err.message.includes('Unknown column'))) {
        await Pet.sequelize.query("ALTER TABLE `pets` ADD COLUMN `price` INT NOT NULL DEFAULT 0 AFTER `color`");
        pets = await Pet.findAll({ where: { category: req.params.category } });
      } else {
        throw err;
      }
    }
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create pet (admin)
// @route POST /api/pets
const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Update pet (admin)
// @route PUT /api/pets/:id
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    await pet.update(req.body);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Delete pet (admin)
// @route DELETE /api/pets/:id
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    await pet.destroy();
    res.json({ message: 'Pet removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPets,
  getPetById,
  getPetsByCategory,
  createPet,
  updatePet,
  deletePet,
};
