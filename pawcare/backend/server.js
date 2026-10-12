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

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully');

    // Creates tables from the models if they don't exist yet.
    // For a production app, use proper migrations instead of sync().
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`PawCare API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Unable to connect to MySQL: ${error.message}`);
    process.exit(1);
  }
};

startServer();
