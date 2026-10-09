const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Pet extends Model {
  toJSON() {
    const values = { ...this.get() };
    values._id = String(values.id);
    return values;
  }
}

Pet.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    category: {
      type: DataTypes.ENUM('Dog', 'Cat', 'Bird', 'Rabbit', 'Other'),
      allowNull: false,
    },
    breed: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.ENUM('Male', 'Female'), allowNull: false },
    size: { type: DataTypes.ENUM('Small', 'Medium', 'Large'), allowNull: false, defaultValue: 'Medium' },
    color: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    location: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    healthStatus: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Healthy' },
    vaccinationStatus: {
      type: DataTypes.ENUM('Vaccinated', 'Not Vaccinated', 'Partially Vaccinated'),
      allowNull: false,
      defaultValue: 'Vaccinated',
    },
    temperament: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    goodWithChildren: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    goodWithPets: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    image: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM('Available', 'Pending', 'Adopted'),
      allowNull: false,
      defaultValue: 'Available',
    },
  },
  {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets',
  }
);

module.exports = Pet;
