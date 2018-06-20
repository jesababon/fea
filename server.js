const express = require("express");
// const reload = require('./node_modules/reload');
const moment = require('moment');
const bodyParser = require('body-parser');
const Encounter = require('./models/Encounter');
const Comment = require('./models/Comment');

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
//COMMENTS

//get all comments
app.get('/encounters/comments', (request, response) => {
  Comment.all().then(comments => {
    response.render('/comments', {
      comments: comments
    });
  });
});


//create a comment by id
app.post('/encounters/comments/', (request, response) => {
  const addComment = request.body;
  Comment.create(addComment).then(comment => {
    response.redirect(302, 'back'); //load same page
  });
});

//get a comment by id
app.get('/encounters/comments/one/:id/', (request, response) => {
  const id = request.params.id;
  Comment.findComment(id).then(comment => {
      return comment[0];
    })
    .then(data => {
      let comment = data.comment_text;
      response.render('encounters/one', {
        comment: comment
      });
    });
});

//edit a  comment
app.get('/encounters/comments/one/edit/:id', (request, response) => {
  const id = request.params.id;
  Comment.findComment(id).then(comment => {
      return comment[0];
    })
    .then(data => {
      let comment = data.comment_text;
      response.render(`encounters/one/edit`, {
        comment: comment
      });
    });
});


//update a comment by id
app.put('/encounters/comments/one/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const updatedComment = request.body;
  console.log(updatedComment);
  updatedComment.comment_id = id;
  Comment.update(updatedComment)
    .then(() => {
      response.redirect(302, 'back');
    });
});


//delete a comment by id
app.delete('/encounters/comments/one/:id', (request, response) => {
  const id = request.params.id;
  Comment.delete(id).then(() => {
    response.redirect(302, `back`);
  });
});



//json
app.get("/encounters.json", (request, response) => {
  Encounter.all().then(encounters => {
    response.json(encounters);
  });
});

// show all encounters. test last as there is a lot of data.
app.get('/encounters', (request, response) => {
  Encounter.all()
    .then(encounters => {
      response.render('encounters/index', {
        encounters: encounters
      });
    });
});

//show one encounter by zip
app.get('/encounters/:zip', (request, response) => {
  const zip = request.params.zip;
  const injuryDate = [];

  Encounter.find(zip).then(encounters => {
    encounters.forEach(encounter => {
      injuryDate.push(moment(encounter.injury_date).format('MMM Do YYYY'));
    });


    response.render('encounters/show', {
      encounters: encounters,
      injuryDate
    });
  });
});

//show one encounter by id
app.get('/encounters/detail/:id', (request, response) => {
  const id = Number(request.params.id);
  Comment.all().then(comments => {
    let comment = comments;

    Encounter.search(id).then(encounter => {
      let idDate = moment(encounter.injury_date).format('MMM Do YYYY');
      response.render('encounters/detail', {
        encounter: encounter,
        comments: comment,
        idDate
      });
    });
  });
});

//HTTP CALLS HERE <---//

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});