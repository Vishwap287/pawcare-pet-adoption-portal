const fs = require('fs');
const path = require('path');

// Distinct names for each category
const dogNames = [
  'Max', 'Bruno', 'Rocky', 'Buddy', 'Charlie', 'Milo', 'Coco', 'Leo', 'Daisy', 'Tommy',
  'Bailey', 'Cooper', 'Teddy', 'Bear', 'Duke', 'Toby', 'Jack', 'Oliver', 'Zeus', 'Winston',
  'Bentley', 'Jax', 'Louie', 'Murphy', 'Tucker', 'Gus', 'Sammy', 'Hank', 'Brody', 'Dexter',
  'Apollo', 'Diesel', 'Koda', 'Bandit', 'Jasper', 'Scout', 'Simba', 'Loki', 'Boomer', 'Rusty',
  'Hunter', 'Chester', 'Otis', 'Archie', 'Ranger', 'Blue', 'Oreo', 'Copper', 'Shadow', 'Chance',
  'Bella', 'Luna', 'Lucy', 'Sadie', 'Molly', 'Stella', 'Maggie', 'Chloe', 'Penny', 'Zoey',
  'Lola', 'Roxy', 'Ruby', 'Rosie', 'Gracie', 'Lily', 'Abby', 'Ellie', 'Mia', 'Piper',
  'Sasha', 'Nala', 'Ginger', 'Hazel', 'Willow', 'Emma', 'Maya', 'Annie', 'Nova', 'Phoebe',
  'Cleo', 'Callie', 'Athena', 'Dixie', 'Remi', 'Millie', 'Sandy', 'Harley', 'Layla', 'Kona',
  'Zoe', 'Olive', 'Honey', 'Lady', 'Dakota', 'Sugar', 'Macy', 'Skye', 'Sunny', 'Peanut'
];

const catNames = [
  'Luna', 'Bella', 'Simba', 'Oliver', 'Nala', 'Lily', 'Milo', 'Chloe', 'Misty', 'Leo',
  'Smokey', 'Cleo', 'Jasper', 'Shadow', 'Loki', 'Tigger', 'Felix', 'Oreo', 'Tiger', 'Gizmo',
  'Buster', 'Sammy', 'Casper', 'Midnight', 'Oscar', 'Ziggy', 'Bandit', 'Simon', 'Garfield', 'Chester',
  'Cosmo', 'Merlin', 'Binx', 'Salem', 'Romeo', 'Frankie', 'Boo', 'Boots', 'Bubba', 'Ash',
  'Snowball', 'Whiskers', 'Pepper', 'Marble', 'Rusty', 'Peanut', 'Kip', 'Hobbes', 'Mac', 'Pip',
  'Sophie', 'Mia', 'Princess', 'Lucy', 'Daisy', 'Stella', 'Willow', 'Gracie', 'Callie', 'Fiona',
  'Hazel', 'Penny', 'Ruby', 'Rosie', 'Zoe', 'Sasha', 'Pepper', 'Coco', 'Cookie', 'Kiki',
  'Mittens', 'Angel', 'Precious', 'Abby', 'Ella', 'Minnie', 'Cleopatra', 'Honey', 'Ginger', 'Sassy',
  'Harper', 'Olive', 'Freya', 'Iris', 'Maisie', 'Pearl', 'Poppy', 'Amber', 'Duchess', 'Gigi',
  'Nutmeg', 'Cinnamon', 'Pixie', 'Sugar', 'Trixie', 'Flora', 'Bonnie', 'Mocha', 'Pebbles', 'Queenie'
];

const birdNames = [
  'Kiwi', 'Rio', 'Sunny', 'Coco', 'Sky', 'Mango', 'Pip', 'Echo', 'Tweety', 'Peanut',
  'Oliver', 'Chirpy', 'Buddy', 'Charlie', 'Blue', 'Angel', 'Pico', 'Zeus', 'Merlin', 'Phoenix',
  'Sparky', 'Sammy', 'Toby', 'Ziggy', 'Milo', 'Jasper', 'Bandit', 'Gizmo', 'Cosmo', 'Archie',
  'Breeze', 'Copper', 'Dusty', 'Flash', 'Harley', 'Indie', 'Joker', 'Kiko', 'Lucky', 'Nugget',
  'Ollie', 'Paco', 'Quincy', 'Rico', 'Shadow', 'Tango', 'Uno', 'Victor', 'Waddles', 'Yoshi',
  'Ruby', 'Bella', 'Luna', 'Daisy', 'Lily', 'Rosie', 'Penny', 'Chloe', 'Zoe', 'Stella',
  'Pepper', 'Willow', 'Honey', 'Ginger', 'Hazel', 'Poppy', 'Pearl', 'Skye', 'Cleo', 'Maya',
  'Fifi', 'Gigi', 'Kiki', 'Lulu', 'Mimi', 'Nala', 'Pixie', 'Sugar', 'Tilly', 'Winnie',
  'Amber', 'Blossom', 'Clover', 'Daffodil', 'Emerald', 'Flora', 'Goldie', 'Holly', 'Iris', 'Jade',
  'Lemon', 'Marigold', 'Nova', 'Opal', 'Petal', 'Rainbow', 'Sapphire', 'Topaz', 'Violet', 'Zinnia'
];

const rabbitNames = [
  'Snowy', 'Oreo', 'Bunny', 'Thumper', 'Clover', 'Cotton', 'Peter', 'Barnaby', 'Buster', 'Chester',
  'Copper', 'Dusty', 'Fluffy', 'Gizmo', 'Harvey', 'Jasper', 'Marshmallow', 'Milo', 'Nugget', 'Oliver',
  'Patch', 'Pip', 'Quincy', 'Rascal', 'Scout', 'Teddy', 'Toby', 'Waffles', 'Ziggy', 'Basil',
  'Benny', 'Biscuit', 'Brownie', 'Butterscotch', 'Carrot', 'Champ', 'Charlie', 'Cinnamon', 'Cosmo', 'Dexter',
  'Felix', 'Fudge', 'George', 'Harry', 'Jack', 'Leo', 'Louie', 'Lucky', 'Mac', 'Max',
  'Bella', 'Daisy', 'Lily', 'Luna', 'Molly', 'Rosie', 'Ruby', 'Sadie', 'Stella', 'Willow',
  'Chloe', 'Coco', 'Ginger', 'Gracie', 'Hazel', 'Honey', 'Lola', 'Lucy', 'Maggie', 'Mia',
  'Penny', 'Pepper', 'Phoebe', 'Piper', 'Princess', 'Roxy', 'Sasha', 'Sophie', 'Zoey', 'Autumn',
  'Blossom', 'Bonnie', 'Buttercup', 'Clementine', 'Daffodil', 'Dixie', 'Ella', 'Fiona', 'Freya', 'Harper',
  'Ivy', 'Jasmine', 'Maisie', 'Nutmeg', 'Olive', 'Pearl', 'Petunia', 'Poppy', 'Sugar', 'Trixie'
];

const otherNames = [
  'Spike', 'Ziggy', 'Shelly', 'Peanut', 'Nugget', 'Squeaky', 'Nibbles', 'Pip', 'Barnaby', 'Chester',
  'Copper', 'Fidget', 'Gizmo', 'Hobbes', 'Jasper', 'Loki', 'Milo', 'Nacho', 'Oatmeal', 'Pickle',
  'Quigley', 'Rascal', 'Scamp', 'Taco', 'Uno', 'Waddles', 'Xander', 'Yoda', 'Zorro', 'Alfie',
  'Archie', 'Baxter', 'Bean', 'Bingo', 'Boba', 'Buster', 'Casper', 'Chico', 'Churro', 'Clyde',
  'Dexter', 'Dobby', 'Elmo', 'Finley', 'Flash', 'Frodo', 'Gulliver', 'Houdini', 'Iggy', 'Jax',
  'Bella', 'Cleo', 'Daisy', 'Hazel', 'Honey', 'Luna', 'Mimi', 'Olive', 'Penny', 'Ruby',
  'Stella', 'Willow', 'Chloe', 'Coco', 'Cookie', 'Ginger', 'Lola', 'Lucy', 'Mochi', 'Pepper',
  'Pixie', 'Rosie', 'Sugar', 'Trixie', 'Waffles', 'Zoe', 'Amber', 'Bambi', 'Bubbles', 'Button',
  'Cinnamon', 'Cupcake', 'Dottie', 'Fiona', 'Gidget', 'Jellybean', 'Kiwi', 'Lily', 'Marbles', 'Minnie',
  'Muffin', 'Nutmeg', 'Pebbles', 'Peaches', 'Pipita', 'Poppy', 'Pumpkin', 'Snickers', 'Sweetpea', 'Twinkie'
];

// Breeds for each category
const dogBreeds = [
  'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Beagle', 'Boxer',
  'Siberian Husky', 'Shih Tzu', 'Rottweiler', 'Border Collie', 'Pomeranian',
  'Great Dane', 'Pembroke Welsh Corgi', 'Doberman Pinscher', 'Cocker Spaniel', 'Australian Shepherd',
  'Chihuahua', 'Cavalier King Charles', 'Boston Terrier', 'Indian Pariah Dog', 'French Bulldog',
  'Dachshund', 'Akita Inu', 'Bernese Mountain Dog', 'Samoyed', 'Dalmatian',
  'Maltipoo', 'Chow Chow', 'Basset Hound', 'Shetland Sheepdog', 'English Bulldog',
  'Saint Bernard', 'Whippet', 'Shiba Inu', 'Weimaraner', 'Jack Russell Terrier',
  'Havanese', 'Papillon', 'Staffordshire Bull Terrier', 'Miniature Schnauzer', 'Bullmastiff',
  'Rhodesian Ridgeback', 'Cane Corso', 'Alaskan Malamute', 'Brittany Spaniel', 'Irish Setter',
  'Bloodhound', 'Bichon Frise', 'Airedale Terrier', 'Basenji', 'Vizsla'
];

const catBreeds = [
  'Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 'Bengal',
  'Ragdoll', 'Sphynx', 'Scottish Fold', 'Abyssinian', 'Birman',
  'Russian Blue', 'Norwegian Forest Cat', 'Oriental Shorthair', 'American Shorthair', 'Burmese',
  'Indian Domestic Cat', 'Bombay', 'Devon Rex', 'Cornish Rex', 'Chartreux',
  'Turkish Angora', 'Tonkinese', 'Ocicat', 'Korat', 'Japanese Bobtail',
  'Balinese', 'Turkish Van', 'Selkirk Rex', 'Somali', 'Manx',
  'Egyptian Mau', 'Siberian', 'Ragamuffin', 'American Curl', 'Havana Brown',
  'Singapora', 'Peterbald', 'Toyger', 'Pixie-bob', 'Himalayan',
  'Chausie', 'Lykoi', 'Snowshoe', 'Colorpoint Shorthair', 'Kurilian Bobtail',
  'Nebelung', 'Cymric', 'Serengeti', 'Highlander', 'Australian Mist'
];

const birdBreeds = [
  'Budgerigar', 'Cockatiel', 'Peach-Faced Lovebird', 'Indian Ringneck Parakeet', 'African Grey Parrot',
  'Canary', 'Zebra Finch', 'Green-Cheeked Conure', 'Sun Conure', 'Blue and Gold Macaw',
  'Scarlet Macaw', 'Umbrella Cockatoo', 'Sulphur-Crested Cockatoo', 'Rainbow Lorikeet', 'Amazon Parrot',
  'Diamond Dove', 'Quaker Parrot', 'Gouldian Finch', 'Eastern Rosella', 'Eclectus Parrot',
  'Pionus Parrot', 'Senegal Parrot', 'White-Bellied Caique', 'Java Sparrow', 'Society Finch',
  'Lineolated Parakeet', 'Bourke Parakeet', 'Meyer Parrot', 'Red-Rumped Parrot', 'Monk Parakeet',
  'Hahn Macaw', 'Derbyan Parakeet', 'Alexandrine Parakeet', 'Plum-Headed Parakeet', 'Crimson Rosella',
  'Fischer Lovebird', 'Black-Masked Lovebird', 'Red-Masked Conure', 'Jenday Conure', 'Blue-Crowned Conure',
  'Crimson-Bellied Conure', 'Yellow-Collared Macaw', 'Severe Macaw', 'Goffin Cockatoo', 'Galah Cockatoo',
  'Major Mitchell Cockatoo', 'Moluccan Cockatoo', 'Black-Headed Caique', 'Dusky Lory', 'Red Lory'
];

const rabbitBreeds = [
  'Holland Lop', 'Netherland Dwarf', 'Mini Lop', 'Dutch Rabbit', 'Flemish Giant',
  'Lionhead', 'Mini Rex', 'Standard Rex', 'English Angora', 'French Angora',
  'English Spot', 'Harlequin', 'Polish Rabbit', 'Jersey Wooly', 'Havana',
  'Silver Marten', 'Tan Rabbit', 'Florida White', 'Cinnamon', 'American Fuzzy Lop',
  'Californian', 'New Zealand White', 'Beveren', 'Belgian Hare', 'Blanc de Hotot',
  'Britannia Petite', 'Champagne d Argent', 'Checkered Giant', 'Chinchilla Rabbit', 'English Lop',
  'French Lop', 'Giant Angora', 'Giant Papillon', 'Lilac Rabbit', 'Palomino',
  'Rhinelander', 'Satin Rabbit', 'Silver Rabbit', 'Silver Fox', 'Thrianta',
  'Satin Angora', 'Velveteen Lop', 'Dwarf Hotot', 'Miniature Papillon', 'Swiss Fox',
  'Meissner Lop', 'Deilenaar', 'Marburger Feh', 'Sallander', 'Alaska Rabbit'
];

const otherBreeds = [
  'Abyssinian Guinea Pig', 'American Guinea Pig', 'Peruvian Guinea Pig', 'Silkie Guinea Pig', 'Teddy Guinea Pig',
  'Crested Guinea Pig', 'Texel Guinea Pig', 'Coronet Guinea Pig', 'Merino Guinea Pig', 'Baldwin Guinea Pig',
  'Syrian Golden Hamster', 'Roborovski Dwarf Hamster', 'Campbell Dwarf Hamster', 'Winter White Hamster', 'Chinese Dwarf Hamster',
  'Red-Eared Slider Turtle', 'Russian Tortoise', 'Greek Tortoise', 'Hermann Tortoise', 'Yellow-Bellied Slider',
  'African Sulcata Tortoise', 'Eastern Box Turtle', 'Mud Turtle', 'Musk Turtle', 'Painted Turtle',
  'Standard Domestic Ferret', 'Silver Ferret', 'Cinnamon Ferret', 'Standard Grey Chinchilla', 'White Mosaic Chinchilla',
  'African Pygmy Hedgehog', 'Sugar Glider', 'Fancy Pet Rat', 'Dumbo Rat', 'Fancy Mouse',
  'Mongolian Gerbil', 'Chilean Degu', 'Bearded Dragon', 'Leopard Gecko', 'Crested Gecko',
  'Blue-Tongued Skink', 'Mexican Axolotl', 'Caribbean Hermit Crab', 'Corn Snake', 'Ball Python',
  'Pacman Frog', 'White Tree Frog', 'Fire-Bellied Toad', 'Green Iguana', 'Yemen Chameleon'
];

const cities = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Chennai', 'Hyderabad',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh', 'Kochi', 'Lucknow',
  'Indore', 'Bhopal', 'Coimbatore', 'Goa', 'Mysore', 'Surat'
];

const dogColors = ['Golden', 'Black & Tan', 'Fawn', 'Tricolor', 'Cream', 'Brown', 'White & Brown', 'Black', 'Red', 'Sable', 'Silver', 'Chocolate', 'Brindle'];
const catColors = ['White', 'Cream & Brown', 'Orange Tabby', 'Grey', 'Tabby', 'Cream & White', 'Spotted Brown', 'Black & White', 'Calico', 'Tortoiseshell', 'Blue', 'Silver'];
const birdColors = ['Green & Yellow', 'Grey & Yellow', 'Green & Orange', 'Green', 'Blue & Yellow', 'Scarlet & Blue', 'White', 'Rainbow', 'Grey & Red', 'Yellow', 'Turquoise', 'Olive'];
const rabbitColors = ['White', 'Black & White', 'Brown & White', 'Grey', 'Fawn', 'Chestnut', 'Chinchilla Grey', 'Orange', 'Cream', 'Lilac', 'Harlequin Pattern', 'Sable'];
const otherColors = ['Brown & White', 'Golden', 'Green', 'White & Ginger', 'Grey', 'Salt & Pepper', 'Spotted Yellow', 'Albino White', 'Striped', 'Tan & Black', 'Calico'];

const dogImages = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
  'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600',
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600',
  'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
  'https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?w=600',
  'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=600',
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600',
  'https://images.unsplash.com/photo-1590419690008-905895e8fe0d?w=600',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600',
  'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600',
  'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600',
  'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600',
  'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600'
];

const catImages = [
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
  'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600',
  'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600',
  'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600',
  'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=600',
  'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600',
  'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600',
  'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600',
  'https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?w=600',
  'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600',
  'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=600'
];

const birdImages = [
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600',
  'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=600',
  'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600',
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600',
  'https://images.unsplash.com/photo-1555169062-013468b47731?w=600',
  'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=600',
  'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
  'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600',
  'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=600',
  'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600',
  'https://images.unsplash.com/photo-1555169062-013468b47731?w=600',
  'https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?w=600',
  'https://images.unsplash.com/photo-1549608276-5786777e6587?w=600',
  'https://images.unsplash.com/photo-1598755257130-c2aaca1f061c?w=600',
  'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600',
  'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=600'
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

const otherImages = [
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600',
  'https://images.unsplash.com/photo-1612267168669-679c961c5b31?w=600',
  'https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?w=600',
  'https://images.unsplash.com/photo-1516025455112-e73ad04772e8?w=600',
  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600',
  'https://images.unsplash.com/photo-1614090332617-e7dd5bd107e3?w=600',
  'https://images.unsplash.com/photo-1587599140470-acf5dc34e4cb?w=600',
  'https://images.unsplash.com/photo-1657076761228-bdb21cf0bc7c?w=600',
  'https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?w=600',
  'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600',
  'https://images.unsplash.com/photo-1508455858334-95337ba25607?w=600',
  'https://images.unsplash.com/photo-1560510051-0a8471dcc293?w=600',
  'https://images.unsplash.com/photo-1544957291-0065cda30872?w=600',
  'https://upload.wikimedia.org/wikipedia/commons/7/72/Igel.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/1/18/Chinchilla_lanigera_%28Wroclaw_zoo%29-2.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/9/98/Bartagame_%28fcm%29.jpg'
];

const dogTemperaments = [
  'Friendly, Playful, Loyal', 'Energetic, Protective, Alert', 'Gentle, Affectionate, Calm',
  'Curious, Outgoing, Loving', 'Smart, Loyal, Watchful', 'Playful, Patient, Sweet',
  'Bold, Confident, Loving', 'Quiet, Gentle, Cuddle-bug', 'Eager to please, Social, Cheerful'
];

const catTemperaments = [
  'Calm, Gentle, Quiet', 'Playful, Affectionate, Vocal', 'Curious, Athletic, Energetic',
  'Independent, Easygoing, Sweet', 'Docile, Relaxed, Loving', 'Social, Inquisitive, Cuddly',
  'Mellow, Friendly, Observant', 'Gentle, Charming, Snuggly'
];

const birdTemperaments = [
  'Cheerful, Vocal, Active', 'Friendly, Musical, Gentle', 'Intelligent, Curious, Social',
  'Affectionate, Bonded, Playful', 'Quiet, Observant, Sweet', 'Alert, Lively, Entertaining'
];

const rabbitTemperaments = [
  'Gentle, Quiet, Curious', 'Playful, Social, Active', 'Shy, Sweet, Gentle',
  'Calm, Affectionate, Docile', 'Curious, Friendly, Energetic', 'Sweet-natured, Placid, Loving'
];

const otherTemperaments = [
  'Sociable, Vocal, Gentle', 'Energetic, Curious, Independent', 'Calm, Low-Maintenance, Observant',
  'Friendly, Gentle, Playful', 'Quiet, Sweet, Shy', 'Inquisitive, Active, Entertaining'
];

const dogDescriptions = [
  'A delightfully friendly soul who loves fetch, outdoor adventures, and cuddling up after playtime.',
  'Extremely loyal, intelligent, and quick to learn new tricks. Loves being part of a loving family.',
  'Gentle-mannered companion who enjoys long strolls in the park and relaxing alongside their humans.',
  'Full of joyful puppy energy and wagging tails, looking for an active and loving home to thrive in.',
  'Affectionate lap dog who brings warmth and endless cheer to any household.',
  'Patient and protective companion who gets along wonderfully with everyone they meet.',
  'A playful spirit with boundless enthusiasm for toys, outdoor runs, and belly rubs.',
  'Calm, well-behaved, and house-trained. Perfect companion for quiet evenings and weekend walks.'
];

const catDescriptions = [
  'Loves lounging in sunlit corners, soft purrs, and relaxing companionship throughout the day.',
  'Curious and athletic, always looking to explore and pounce on feather toys.',
  'Incredibly sweet and affectionate lap cat who adores gentle chin scratches.',
  'Independent yet warm-hearted, makes the perfect low-maintenance companion for a busy owner.',
  'Docile and cuddly, happiest when nestled right beside you or on a plush blanket.',
  'A social conversationalist who greets you at the door with cheerful chirps and headbutts.',
  'Calm senior cat seeking a serene forever home to nap peacefully and share quiet affection.'
];

const birdDescriptions = [
  'Cheerful whistling companion who brightens up the entire room with delightful tunes and chirps.',
  'Inquisitive bird who loves interactive puzzle toys, fresh fruits, and learning friendly whistles.',
  'Affectionate companion who enjoys sitting on shoulders and gentle head scratches.',
  'Very colorful and vibrant, brings continuous joy and gentle ambient melody to your living space.',
  'Smart and attentive, loves social engagement and mimicking household sounds.'
];

const rabbitDescriptions = [
  'Soft and gentle bunny with adorable floppy ears, loves snacking on fresh greens and quiet cuddles.',
  'Curious hopper who enjoys exploring safe indoor play areas and gentle chin rubs.',
  'Mellow and calm, perfect for an apartment or quiet family seeking a peaceful companion.',
  'Sweet and docile rabbit who quickly warms up with treats and cozy floor time.',
  'Playful and social, loves cardboard tunnel toys and jumping for joy.'
];

const otherDescriptions = [
  'Very sweet small pet who squeaks with delight when treat time arrives.',
  'Low-maintenance and calm, wonderful for animal lovers looking for a fascinating pet.',
  'Curious and nocturnal adventurer who loves running, climbing, and exploring cozy tunnels.',
  'Gentle and sociable companion that thrives in a clean, caring habitat.',
  'Fun-loving pocket pet with tons of personality and gentle demeanor.'
];

// Helper to generate 100 pets for a category
function generatePetsForCategory(config) {
  const {
    category,
    names,
    breeds,
    colors,
    images,
    temperaments,
    descriptions,
    defaultSizeDist,
    sizes
  } = config;

  const result = [];

  for (let i = 0; i < 100; i++) {
    const name = names[i];
    const breed = breeds[i % breeds.length];
    const age = (i % 10) + 1; // 1 to 10
    const gender = i % 2 === 0 ? 'Male' : 'Female';
    const size = sizes ? sizes[i % sizes.length] : (i % 3 === 0 ? 'Small' : i % 3 === 1 ? 'Medium' : 'Large');
    const color = colors[i % colors.length];
    const location = cities[i % cities.length];
    const temperament = temperaments[i % temperaments.length];
    const descTemplate = descriptions[i % descriptions.length];
    const description = `${name} is a ${age}-year-old ${breed}. ${descTemplate}`;
    
    // Status: 85% Available, 10% Pending, 5% Adopted
    let status = 'Available';
    if (i % 20 === 18) status = 'Adopted';
    else if (i % 10 === 9) status = 'Pending';

    // Vaccination: 75% Vaccinated, 20% Partially, 5% Not
    let vaccinationStatus = 'Vaccinated';
    if (category === 'Bird' || category === 'Other') {
      vaccinationStatus = i % 4 === 0 ? 'Vaccinated' : (i % 4 === 1 ? 'Partially Vaccinated' : 'Not Vaccinated');
    } else {
      vaccinationStatus = i % 10 === 0 ? 'Not Vaccinated' : (i % 5 === 0 ? 'Partially Vaccinated' : 'Vaccinated');
    }

    const healthStatus = age >= 8 ? 'Healthy - Senior' : (i % 7 === 0 ? 'Healthy - Vaccinated & Neutered' : 'Healthy');
    const goodWithChildren = i % 8 !== 0;
    const goodWithPets = category === 'Bird' || category === 'Rabbit' ? (i % 3 === 0) : (i % 5 !== 0);

    const baseImg = images[i % images.length];
    const image = `${baseImg}&pet=${category.toLowerCase()}_${i + 1}`;

    // Price in ₹ (INR) based on category and indexing for variety
    let price = 0;
    if (category === 'Dog') {
      const dogPrices = [2500, 3500, 4000, 5000, 6500, 3000, 4500, 7500, 2000, 0];
      price = dogPrices[i % dogPrices.length];
    } else if (category === 'Cat') {
      const catPrices = [1500, 2500, 3000, 3500, 4500, 2000, 1800, 0];
      price = catPrices[i % catPrices.length];
    } else if (category === 'Bird') {
      const birdPrices = [600, 900, 1200, 1500, 2200, 800, 1800, 0];
      price = birdPrices[i % birdPrices.length];
    } else if (category === 'Rabbit') {
      const rabbitPrices = [700, 1000, 1200, 1500, 1800, 800, 0];
      price = rabbitPrices[i % rabbitPrices.length];
    } else {
      const otherPrices = [400, 600, 800, 1000, 1200, 500, 0];
      price = otherPrices[i % otherPrices.length];
    }

    result.push({
      name,
      category,
      breed,
      age,
      gender,
      size,
      color,
      price,
      location,
      description,
      healthStatus,
      vaccinationStatus,
      temperament,
      goodWithChildren,
      goodWithPets,
      image,
      status
    });
  }

  return result;
}

const dogs = generatePetsForCategory({
  category: 'Dog',
  names: dogNames,
  breeds: dogBreeds,
  colors: dogColors,
  images: dogImages,
  temperaments: dogTemperaments,
  descriptions: dogDescriptions,
  sizes: ['Medium', 'Large', 'Small', 'Large', 'Medium', 'Small']
});

const cats = generatePetsForCategory({
  category: 'Cat',
  names: catNames,
  breeds: catBreeds,
  colors: catColors,
  images: catImages,
  temperaments: catTemperaments,
  descriptions: catDescriptions,
  sizes: ['Small', 'Medium', 'Medium', 'Small', 'Large']
});

const birds = generatePetsForCategory({
  category: 'Bird',
  names: birdNames,
  breeds: birdBreeds,
  colors: birdColors,
  images: birdImages,
  temperaments: birdTemperaments,
  descriptions: birdDescriptions,
  sizes: ['Small', 'Small', 'Medium', 'Small', 'Large']
});

const rabbits = generatePetsForCategory({
  category: 'Rabbit',
  names: rabbitNames,
  breeds: rabbitBreeds,
  colors: rabbitColors,
  images: rabbitImages,
  temperaments: rabbitTemperaments,
  descriptions: rabbitDescriptions,
  sizes: ['Small', 'Small', 'Medium', 'Small']
});

const others = generatePetsForCategory({
  category: 'Other',
  names: otherNames,
  breeds: otherBreeds,
  colors: otherColors,
  images: otherImages,
  temperaments: otherTemperaments,
  descriptions: otherDescriptions,
  sizes: ['Small', 'Small', 'Small', 'Medium']
});

const allPets = [...dogs, ...cats, ...birds, ...rabbits, ...others];

console.log(`Generated ${dogs.length} dogs, ${cats.length} cats, ${birds.length} birds, ${rabbits.length} rabbits, ${others.length} others.`);
console.log(`Total pets: ${allPets.length}`);

const fileContent = `// Auto-generated seed data: 100 pets for each category (500 total)
const pets = ${JSON.stringify(allPets, null, 2)};

module.exports = pets;
`;

const outputPath = path.join(__dirname, 'seedData.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Wrote ${allPets.length} pets to ${outputPath}`);
