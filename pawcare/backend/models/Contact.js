const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Contact extends Model {
  toJSON() {
    const values = { ...this.get() };
    values._id = String(values.id);
    return values;
  }
}

Contact.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    subject: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
    message: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('Unread', 'Read'), allowNull: false, defaultValue: 'Unread' },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
  }
);

module.exports = Contact;
