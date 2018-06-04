const db = require('../database/connection');

// console.log(db);
const Comment = {};

Comment.all = function () {
  return db.any('SELECT * FROM comments');
};

Comment.all().then(Comments => {
  return Comments;
});

Comment.find = (id) => {
  return db.any(`SELECT * FROM comments WHERE comment_id = $1`, [id]);
};

console.log('Comment.js connected');


module.exports = Comment;

