const db = require('../database/connection');

// console.log(db);
const Encounter = {};

Encounter.all = function () {
  return db.any('SELECT * FROM encounters');
};

// Encounter.all().then(encounters => {
//   return encounters;
// });

Encounter.find = (zip) => {
  return db.any(`SELECT * FROM encounters WHERE zip_code = $1`, [zip]);
};

Encounter.search = (id) => {
  return db.one(`SELECT * FROM encounters WHERE encounter_id = $1`, [id]);
};


console.log('Encounter.js connected');


module.exports = Encounter;
