require('dotenv').config();
const { sequelize, Pet } = require('../models');
const seedPets = require('./seedData');

async function updatePrices() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Ensure column exists in MySQL
    const [columns] = await sequelize.query("SHOW COLUMNS FROM pets LIKE 'price'");
    if (columns.length === 0) {
      console.log("Column 'price' does not exist. Adding column to 'pets' table...");
      await sequelize.query("ALTER TABLE pets ADD COLUMN price INT NOT NULL DEFAULT 0 AFTER color");
      console.log("Column 'price' added successfully.");
    } else {
      console.log("Column 'price' already exists.");
    }

    const currentPets = await Pet.findAll({ order: [['id', 'ASC']] });
    console.log(`Found ${currentPets.length} pets in database.`);

    let updatedCount = 0;
    for (let i = 0; i < currentPets.length; i++) {
      const dbPet = currentPets[i];
      // Match by seed if possible, or calculate based on category/index
      let price = 0;
      if (i < seedPets.length && seedPets[i].name === dbPet.name) {
        price = seedPets[i].price;
      } else {
        const cat = dbPet.category;
        if (cat === 'Dog') {
          const p = [2500, 3500, 4000, 5000, 6500, 3000, 4500, 7500, 2000, 0];
          price = p[i % p.length];
        } else if (cat === 'Cat') {
          const p = [1500, 2500, 3000, 3500, 4500, 2000, 1800, 0];
          price = p[i % p.length];
        } else if (cat === 'Bird') {
          const p = [600, 900, 1200, 1500, 2200, 800, 1800, 0];
          price = p[i % p.length];
        } else if (cat === 'Rabbit') {
          const p = [700, 1000, 1200, 1500, 1800, 800, 0];
          price = p[i % p.length];
        } else {
          const p = [400, 600, 800, 1000, 1200, 500, 0];
          price = p[i % p.length];
        }
      }

      await dbPet.update({ price });
      updatedCount++;
    }

    console.log(`Successfully updated prices for ${updatedCount} pets!`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating prices:', error);
    process.exit(1);
  }
}

updatePrices();
