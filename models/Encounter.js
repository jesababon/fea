const db = require('../database/connection');

// console.log(db);
const Encounter = {};

Encounter.all = function () {
  return db.any('SELECT * FROM encounters');
};

Encounter.all().then(encounters => {
  return encounters;
});

Encounter.find = (zip) => {
  return db.any(`SELECT * FROM encounters WHERE zip_code = $1`, [zip]);
};

// Encounter.search = (id) => {
//   return db.one(`SELECT * FROM encounters WHERE encounter_id = $1`, [id]);
// };

// const getEncounters = page => {
//   let offset = (page - 1) * 2;
//   return db.any("SELECT * FROM encounters LIMIT 2 OFFSET $1", [offset]);
// };

console.log('Encounter.js connected');


module.exports = Encounter;
