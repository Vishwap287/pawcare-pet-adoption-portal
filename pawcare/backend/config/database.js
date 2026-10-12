const { Sequelize } = require('sequelize');

const isRemoteHost =
  process.env.DB_HOST &&
  !['localhost', '127.0.0.1'].includes(process.env.DB_HOST);

const isSSLRequired =
  process.env.DB_SSL === 'true' ||
  process.env.NODE_ENV === 'production' ||
  isRemoteHost;

const dialectOptions = isSSLRequired
  ? {
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
    }
  : {};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      dialectOptions,
      logging: false,
      define: {
        timestamps: true,
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        dialectOptions,
        logging: false,
        define: {
          timestamps: true,
        },
      }
    );

module.exports = sequelize;
