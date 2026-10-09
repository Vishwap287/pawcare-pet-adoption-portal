const sequelize = require('../config/database');
const User = require('./User');
const Pet = require('./Pet');
const Adoption = require('./Adoption');
const Contact = require('./Contact');
const Favorite = require('./Favorite');

// Adoption relations
User.hasMany(Adoption, { foreignKey: 'userId', as: 'adoptions', onDelete: 'CASCADE' });
Adoption.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Pet.hasMany(Adoption, { foreignKey: 'petId', as: 'adoptions', onDelete: 'CASCADE' });
Adoption.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });

// Favorites (many-to-many through Favorite join table)
User.belongsToMany(Pet, {
  through: Favorite,
  as: 'favorites',
  foreignKey: 'userId',
  otherKey: 'petId',
});
Pet.belongsToMany(User, {
  through: Favorite,
  as: 'favoritedBy',
  foreignKey: 'petId',
  otherKey: 'userId',
});

module.exports = { sequelize, User, Pet, Adoption, Contact, Favorite };
