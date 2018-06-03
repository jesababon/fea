const express = require("express");
// const reload = require('./node_modules/reload');
const bodyParser = require('body-parser');
const Encounter = require('./models/Encounter');
const methodOverride = require("method-override");
const PORT = process.env.PORT || 4567;
const app = express();

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('view engine', 'ejs');

app.use('/public', express.static("public"));

//HTTP CALLS HERE --->
// show all encounters. test last as there is a lot of data.
app.get('/encounters', (request, response) => {
  Encounter.all()
    .then(encounters => {
      response.render('encounters/index', {
        encounters: encounters
      });
    });
});

//json
app.get("/encounters.json", (request, response) => {
  Encounter.all().then(encounters => {
    response.json(encounters);
  });
});


// api routes
// app.get("/api/encounters", (request, response) => {
//   const page = request.query.page || 1;
//   getEncounters(page).then(encountersFromDB => {
//     response.json(encountersFromDB);
//   });
// });


//show one encounter by zip
app.get('/encounters/:zip', (request, response) => {
  const zip = request.params.zip;
  Encounter.find(zip).then(encounter => {

    response.render('encounters/show', {
      encounter: encounter
    });
  });
});

//show one encounter by id
app.get('/encounters/detail/:id', (request, response) => {
  const id = request.params.id;
  Encounter.search(id).then(encounter => {
    response.render('encounters/detail', {
      encounter: encounter
    });
  });
});


//HTTP CALLS HERE <---//

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});

