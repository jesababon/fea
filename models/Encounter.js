const db = require('../database/connection');

// console.log(db);
const Encounter = {};

Encounter.all = function(){
  return db.any('SELECT * FROM encounters');
};

Encounter.all().then(encounters => {
  return encounters;
});


console.log('Encounter.js connected');


module.exports = Encounter;
