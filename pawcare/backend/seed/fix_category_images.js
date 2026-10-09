const mysql = require('mysql2/promise');
require('dotenv').config();

const guineaPigImages = [
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600',
  'https://images.unsplash.com/photo-1612267168669-679c961c5b31?w=600',
  'https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?w=600',
  'https://images.unsplash.com/photo-1516025455112-e73ad04772e8?w=600'
];

const hamsterImages = [
  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600',
  'https://images.unsplash.com/photo-1614090332617-e7dd5bd107e3?w=600',
  'https://images.unsplash.com/photo-1587599140470-acf5dc34e4cb?w=600',
  'https://images.unsplash.com/photo-1657076761228-bdb21cf0bc7c?w=600'
];

const turtleImages = [
  'https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?w=600',
  'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600',
  'https://images.unsplash.com/photo-1508455858334-95337ba25607?w=600'
];

const ferretImages = [
  'https://images.unsplash.com/photo-1560510051-0a8471dcc293?w=600',
  'https://images.unsplash.com/photo-1544957291-0065cda30872?w=600'
];

const hedgehogImages = [
  'https://upload.wikimedia.org/wikipedia/commons/7/72/Igel.JPG'
];

const chinchillaImages = [
  'https://upload.wikimedia.org/wikipedia/commons/1/18/Chinchilla_lanigera_%28Wroclaw_zoo%29-2.JPG'
];

const reptileImages = [
  'https://upload.wikimedia.org/wikipedia/commons/9/98/Bartagame_%28fcm%29.jpg'
];

const rabbitImages = [
  'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600',
  'https://images.unsplash.com/photo-1591561582301-7ce6588cc286?w=600',
  'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=600',
  'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=600',
  'https://images.unsplash.com/photo-1518796745738-41048802f99a?w=600',
  'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600',
  'https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?w=600',
  'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?w=600',
  'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=600',
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600',
  'https://images.unsplash.com/photo-1509205477838-a534e43a849f?w=600'
];

const birdImages = [
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600',
  'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=600',
  'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600',
  'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
  'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=600',
  'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600',
  'https://images.unsplash.com/photo-1555169062-013468b47731?w=600',
  'https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?w=600',
  'https://images.unsplash.com/photo-1549608276-5786777e6587?w=600',
  'https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?w=600',
  'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600',
  'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=600'
];

async function updateDb() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'pawcare'
  });

  console.log('Connected to MySQL. Fetching all pets...');
  const [pets] = await conn.query('SELECT id, name, category, breed, image FROM pets');
  console.log(`Found ${pets.length} pets.`);

  let updatedCount = 0;

  for (const pet of pets) {
    let chosenImg = pet.image;
    const cat = pet.category;
    const breed = (pet.breed || '').toLowerCase();
    const id = pet.id;

    if (cat === 'Rabbit') {
      chosenImg = rabbitImages[id % rabbitImages.length];
    } else if (cat === 'Bird') {
      chosenImg = birdImages[id % birdImages.length];
    } else if (cat === 'Other') {
      if (breed.includes('guinea pig')) {
        chosenImg = guineaPigImages[id % guineaPigImages.length];
      } else if (breed.includes('hamster') || breed.includes('mouse') || breed.includes('gerbil') || breed.includes('rat') || breed.includes('degu')) {
        chosenImg = hamsterImages[id % hamsterImages.length];
      } else if (breed.includes('turtle') || breed.includes('tortoise')) {
        chosenImg = turtleImages[id % turtleImages.length];
      } else if (breed.includes('ferret')) {
        chosenImg = ferretImages[id % ferretImages.length];
      } else if (breed.includes('hedgehog')) {
        chosenImg = hedgehogImages[id % hedgehogImages.length];
      } else if (breed.includes('chinchilla')) {
        chosenImg = chinchillaImages[id % chinchillaImages.length];
      } else {
        chosenImg = reptileImages[id % reptileImages.length];
      }
    }

    if (chosenImg && chosenImg !== pet.image) {
      await conn.query('UPDATE pets SET image = ? WHERE id = ?', [chosenImg, id]);
      updatedCount++;
    }
  }

  console.log(`Successfully updated ${updatedCount} pet images in database.`);
  await conn.end();
}

updateDb().catch(console.error);
