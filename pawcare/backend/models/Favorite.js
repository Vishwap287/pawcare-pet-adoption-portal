const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

// Join table for the User <-> Pet favorites many-to-many relationship
class Favorite extends Model {}

Favorite.init(
  {},
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
  }
);

module.exports = Favorite;
