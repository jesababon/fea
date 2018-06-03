const express = require("express");
const reload = require('./node_modules/reload');
const bodyParser = require('body-parser');
const Encounter = require('./models/Encounter');
const methodOverride = require("method-override");
const PORT = process.env.PORT || 4567;
const app = express();
const moment = require('moment');


app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('view engine', 'ejs');

app.use('/public', express.static("public"));

//HTTP CALLS HERE --->
//show all encounters. test last as there is a lot of data.
app.get('/encounters', (request, response) => {
  Encounter.all()
    .then(encounters => {
        encounters.forEach(encounter => {
          const injuryDate = [];
          injuryDate.push(moment(encounter.injury_date).format("MMM Do YYYY"));
        });
      response.render('encounters/index', {
        encounters: encounters, injuryDate
      });
    });
});

//show one encounter by id
// app.get('/encounters/:id', (request, response) => {
//   const id = request.params.id;
//   Encounter.find(id).then(encounter => {
//     response.render('encounters/show', {
//       encounter: encounter
//     });
//   });
// });

//show one encounter by zip
app.get('/encounters/:zip', (request, response) => {
  const zip = request.params.zip;
  Encounter.find(zip).then(encounter => {
    encounters.forEach(encounter => {
      const injuryDate = [];
      injuryDate.push(moment(encounter.injury_date).format("MMM Do YYYY"));
    });
    response.render('encounters/show', {
      encounter: encounter, injuryDate
    });
  });
});



//HTTP CALLS HERE <---//

reload(app);

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});


