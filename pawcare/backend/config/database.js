
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,

    dialectOptions: {
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
    },

    define: {
      timestamps: true,
    },
  }
);

module.exports = sequelize;
