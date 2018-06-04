const db = require('../database/connection');

// console.log(db);
const Comment = {};

Comment.all = function () {
  return db.any('SELECT * FROM comments');
};

// Comment.all().then(comments => {
//   console.log(comments);
  
// });

Comment.find = (id) => {
  return db.any(`SELECT * FROM comments WHERE comment_id = $1`, [id]);
};

Comment.create = (comment) => {
  return db.one(`INSERT INTO comments (comment_text)
  VALUES ($1) RETURNING *`, [comment.comment_text]);
};

Comment.update = commentUpdate => {
  return db.none(`UPDATE comments SET comment_text = $1 WHERE comment_id = $2`, [commentUpdate.comment_text, commentUpdate.comment_id]);
};


console.log('Comment.js connected');


module.exports = Comment;

