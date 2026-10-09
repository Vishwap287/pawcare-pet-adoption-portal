const dotenv = require('dotenv');
dotenv.config();

const { sequelize, User, Pet, Adoption, Contact, Favorite } = require('../models');
const pets = require('./seedData');

const importData = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected. Syncing tables (force: true)...');

    // force: true drops and recreates tables — fine for a dev/demo database.
    await sequelize.sync({ force: true });

    await Pet.bulkCreate(pets);
    console.log(`${pets.length} pets seeded successfully!`);

    await User.create({
      name: process.env.ADMIN_NAME || 'PawCare Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });
    console.log(`Admin created: ${process.env.ADMIN_EMAIL}`);

    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await sequelize.authenticate();
    await Adoption.destroy({ where: {}, truncate: true, force: true });
    await Favorite.destroy({ where: {}, truncate: true, force: true });
    await Pet.destroy({ where: {}, truncate: true, force: true });
    await User.destroy({ where: {}, truncate: true, force: true });
    await Contact.destroy({ where: {}, truncate: true, force: true });
    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
