const https = require('https');

function follow(id) {
  return new Promise((resolve) => {
    const rawId = id.replace('photo-', '');
    https.get(`https://unsplash.com/photos/${rawId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      if (res.headers.location) {
        resolve({ id, redirect: res.headers.location });
      } else {
        resolve({ id, status: res.statusCode });
      }
    }).on('error', (err) => resolve({ id, error: err.message }));
  });
}

const list = [
  // dogs sample
  'photo-1552053831-71594a27632d',
  'photo-1589941013453-ec89f33b5e95',
  // cats sample
  'photo-1518791841217-8f162f1e1131',
  'photo-1495360010541-f48722b34f7d',
  // birds
  'photo-1552728089-57bdde30beb3',
  'photo-1518998053901-5348d3961a04',
  'photo-1522858547137-f1dcec554f55',
  'photo-1544923246-77307dd654cb',
  'photo-1606567595334-d39972c85dbe',
  'photo-1534447677768-be436bb09401',
  'photo-1520808663317-647b476a81b9',
  'photo-1444464666168-49d633b86797',
  'photo-1555169062-013468b47731',
  'photo-1506220926022-cc5c12acdb35',
  'photo-1549608276-5786777e6587',
  'photo-1598755257130-c2aaca1f061c',
  'photo-1578328819058-b69f3a3b0f6b',
  'photo-1582845512747-e42001c95638',
  'photo-1559827260-dc66d52bef19',
  // rabbits
  'photo-1585110396000-c9ffd4e4b308',
  'photo-1591561582301-7ce6588cc286',
  'photo-1615497001839-b0a0eac3274c',
  'photo-1589952283406-b53a7d1347e8',
  'photo-1518796745738-41048802f99a',
  'photo-1535268647677-300dbf3d78d1',
  'photo-1583301286816-f4f05e1e8b25',
  'photo-1517456793572-1d8efd6dc135',
  'photo-1548767797-d8c844163c4c',
  'photo-1563281577-a7be47e20db9',
  'photo-1543610892-0b1f7e6d8ac1',
  'photo-1576201836106-db1758fd1c97',
  'photo-1509205477838-a534e43a849f',
  // others
  'photo-1425082661705-1834bfd09dca',
  'photo-1505628346881-b72b27e84530',
  'photo-1516734212186-a967f81ad0d7',
  'photo-1541781774459-bb2af2f05b55',
  'photo-1508280756091-9bdd7ef1f463'
];

async function main() {
  for (const item of list) {
    const r = await follow(item);
    console.log(item, '->', r.redirect || r.status);
  }
}
main();
