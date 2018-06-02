const express = require("express");
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
//show all tasks
app.get('/encounters', (request, response) => {
  Encounter.all()
    .then(encounters => {
      response.render('encounters/index', {
        encounters: encounters
      });
    });
});


//HTTP CALLS HERE <---//

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});


