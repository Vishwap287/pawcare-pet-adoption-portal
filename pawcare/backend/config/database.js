const { Sequelize } = require('sequelize');

const cleanVal = (val) =>
  typeof val === 'string' ? val.trim().replace(/^['"]+|['"]+$/g, '') : val;

const dbHost = cleanVal(process.env.DB_HOST) || '127.0.0.1';
const dbPort = Number(cleanVal(process.env.DB_PORT)) || 3306;
const dbName = cleanVal(process.env.DB_NAME) || 'pawcare';
const dbUser = cleanVal(process.env.DB_USER);
const dbPassword = cleanVal(process.env.DB_PASSWORD);

const isRemoteHost = dbHost && !['localhost', '127.0.0.1'].includes(dbHost);

const isSSLRequired =
  cleanVal(process.env.DB_SSL) === 'true' ||
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
  ? new Sequelize(cleanVal(process.env.DATABASE_URL), {
      dialect: 'mysql',
      dialectOptions,
      logging: false,
      define: {
        timestamps: true,
      },
    })
  : new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: 'mysql',
      dialectOptions,
      logging: false,
      define: {
        timestamps: true,
      },
    });

module.exports = sequelize;
