const { Op } = require('sequelize');
const { Adoption, Pet, User } = require('../models');

// @desc  Submit adoption application
// @route POST /api/adoptions
const createAdoption = async (req, res) => {
  try {
    const petId = Number(req.body.pet);
    const pet = await Pet.findByPk(petId);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    if (pet.status === 'Adopted') {
      return res.status(400).json({ message: 'This pet has already been adopted' });
    }

    const existing = await Adoption.findOne({
      where: {
        userId: req.user.id,
        petId,
        status: { [Op.in]: ['Pending', 'Approved'] },
      },
    });
    if (existing) {
      return res.status(400).json({ message: 'You already have an active application for this pet' });
    }

    if (!req.body.agreementAccepted) {
      return res.status(400).json({ message: 'You must accept the care agreement' });
    }

    const {
      fullName, email, phone, address, homeType, ownershipStatus, familyMembers,
      previousPetExperience, workingHours, petCarePlan, reasonForAdoption,
      financiallyPrepared, agreementAccepted,
    } = req.body;

    const adoption = await Adoption.create({
      userId: req.user.id,
      petId,
      fullName, email, phone, address, homeType, ownershipStatus, familyMembers,
      previousPetExperience, workingHours, petCarePlan, reasonForAdoption,
      financiallyPrepared, agreementAccepted,
    });

    pet.status = 'Pending';
    await pet.save();

    res.status(201).json(adoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc  Get logged-in user's applications
// @route GET /api/adoptions/my
const getMyAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.findAll({
      where: { userId: req.user.id },
      include: [{ model: Pet, as: 'pet' }],
      order: [['createdAt', 'DESC']],
    });
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all applications (admin)
// @route GET /api/adoptions
const getAdoptions = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;

    const adoptions = await Adoption.findAll({
      where,
      include: [
        { model: Pet, as: 'pet' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single application
// @route GET /api/adoptions/:id
const getAdoptionById = async (req, res) => {
  try {
    const adoption = await Adoption.findByPk(req.params.id, {
      include: [
        { model: Pet, as: 'pet' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
      ],
    });
    if (!adoption) return res.status(404).json({ message: 'Application not found' });

    if (req.user.role !== 'admin' && String(adoption.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }

    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update application status (admin)
// @route PUT /api/adoptions/:id/status
const updateAdoptionStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;
    if (!['Pending', 'Approved', 'Rejected', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const adoption = await Adoption.findByPk(req.params.id);
    if (!adoption) return res.status(404).json({ message: 'Application not found' });

    adoption.status = status;
    if (adminRemarks !== undefined) adoption.adminRemarks = adminRemarks;
    await adoption.save();

    const pet = await Pet.findByPk(adoption.petId);
    if (status === 'Approved') {
      pet.status = 'Adopted';
      await pet.save();
      await Adoption.update(
        { status: 'Rejected', adminRemarks: 'Pet has been adopted by another applicant' },
        { where: { petId: pet.id, id: { [Op.ne]: adoption.id }, status: 'Pending' } }
      );
    } else if (status === 'Rejected') {
      if (pet.status !== 'Adopted') {
        pet.status = 'Available';
        await pet.save();
      }
    }

    const populated = await Adoption.findByPk(adoption.id, {
      include: [
        { model: Pet, as: 'pet' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] },
      ],
    });
    res.json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAdoption,
  getMyAdoptions,
  getAdoptions,
  getAdoptionById,
  updateAdoptionStatus,
};
