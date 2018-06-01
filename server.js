const express = require("express");
const bodyParser = require('body-parser');
const Task = require('./models/Encounter');
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


