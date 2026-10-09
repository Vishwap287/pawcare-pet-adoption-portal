const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Adoption extends Model {
  toJSON() {
    const values = { ...this.get() };
    values._id = String(values.id);
    return values;
  }
}

Adoption.init(
  {
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    homeType: { type: DataTypes.STRING, allowNull: false },
    ownershipStatus: { type: DataTypes.ENUM('Own', 'Rent'), allowNull: false },
    familyMembers: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    previousPetExperience: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
    workingHours: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    petCarePlan: { type: DataTypes.TEXT, allowNull: false },
    reasonForAdoption: { type: DataTypes.TEXT, allowNull: false },
    financiallyPrepared: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    agreementAccepted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'Completed'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    adminRemarks: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
  },
  {
    sequelize,
    modelName: 'Adoption',
    tableName: 'adoptions',
  }
);

module.exports = Adoption;
