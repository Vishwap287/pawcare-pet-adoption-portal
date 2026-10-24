const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

const rawClientUrl = process.env.CLIENT_URL || '';
const allowedOrigins = rawClientUrl
  ? rawClientUrl.split(',').map((u) => u.trim().replace(/\/$/, ''))
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      if (
        !rawClientUrl ||
        rawClientUrl === '*' ||
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.includes('localhost') ||
        cleanOrigin.includes('vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    name: 'PawCare Pet Adoption API',
    message: 'Backend server is running successfully and connected to TiDB Cloud! 🐾',
    health: '/api/health',
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PawCare API is running' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/adoptions', require('./routes/adoptionRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.use(notFound);
app.use(errorHandler);

const mysql = require('mysql2/promise');

const ensureDatabaseExists = async () => {
  const cleanVal = (val) =>
    typeof val === 'string' ? val.trim().replace(/^['"]+|['"]+$/g, '') : val;

  const dbName = cleanVal(process.env.DB_NAME) || 'pawcare';
  const host = cleanVal(process.env.DB_HOST) || '127.0.0.1';
  const port = Number(cleanVal(process.env.DB_PORT)) || 3306;
  const user = cleanVal(process.env.DB_USER);
  const password = cleanVal(process.env.DB_PASSWORD);
  const isRemote = host && !['localhost', '127.0.0.1'].includes(host);
  const ssl =
    cleanVal(process.env.DB_SSL) === 'true' || isRemote
      ? { minVersion: 'TLSv1.2', rejectUnauthorized: true }
      : undefined;

  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      ssl,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.end();
    console.log(`Database "${dbName}" verified/created successfully.`);
  } catch (err) {
    if (err.errno === 1007 || (err.message && err.message.includes('database exists'))) {
      console.log(`Database "${dbName}" already exists and ready.`);
    } else {
      console.warn(`Database verification note: ${err.message}`);
    }
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log('MySQL connected successfully');

    // Creates tables from the models if they don't exist yet.
    await sequelize.sync();

    // Auto-migration: Ensure 'price' column exists in production database
    try {
      const [cols] = await sequelize.query("SHOW COLUMNS FROM `pets` LIKE 'price'");
      if (!cols || cols.length === 0) {
        console.log("Adding missing 'price' column to pets table...");
        await sequelize.query("ALTER TABLE `pets` ADD COLUMN `price` INT NOT NULL DEFAULT 0 AFTER `color`");
        console.log("'price' column added successfully.");
        const seedPets = require('./seed/seedData');
        for (const sp of seedPets) {
          await Pet.update({ price: sp.price }, { where: { name: sp.name, category: sp.category } });
        }
        console.log("Updated prices for existing pets.");
      }
    } catch (migErr) {
      console.warn("Column migration check:", migErr.message);
    }

    // Auto-seed initial data if database is fresh
    try {
      const { User, Pet } = require('./models');
      const petCount = await Pet.count();
      if (petCount === 0) {
        console.log('Database tables empty. Auto-seeding initial pets...');
        const initialPets = require('./seed/seedData');
        await Pet.bulkCreate(initialPets);
        console.log(`${initialPets.length} pets seeded successfully!`);
      }

      const adminEmail = process.env.ADMIN_EMAIL || 'admin@pawcare.com';
      const adminUser = await User.findOne({ where: { email: adminEmail } });
      if (!adminUser) {
        await User.create({
          name: process.env.ADMIN_NAME || 'PawCare Admin',
          email: adminEmail,
          password: process.env.ADMIN_PASSWORD || 'admin123',
          role: 'admin',
        });
        console.log(`Default admin account ready: ${adminEmail}`);
      }
    } catch (seedErr) {
      console.warn(`Auto-seed note: ${seedErr.message}`);
    }

    app.listen(PORT, () => {
      console.log(`PawCare API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Unable to connect to MySQL: ${error.message}`);
    process.exit(1);
  }
};

startServer();
