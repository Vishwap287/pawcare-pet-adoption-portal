const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

class User extends Model {
  async matchPassword(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  }

  toJSON() {
    const values = { ...this.get() };
    values._id = String(values.id); // kept for frontend compatibility
    delete values.password;
    return values;
  }
}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
      set(value) {
        this.setDataValue('email', value ? value.toLowerCase().trim() : value);
      },
    },
    phone: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false, validate: { len: [6, 200] } },
    role: { type: DataTypes.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' },
    profileImage: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    address: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    city: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    state: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    pincode: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    isBlocked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

module.exports = User;
