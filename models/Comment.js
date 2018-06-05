const db = require('../database/connection');

// console.log(db);
const Comment = {};

Comment.all = function () {
  return db.any('SELECT * FROM comments');
};

// Comment.all().then(comments => {
//   console.log(comments);
  
// });

Comment.findComment = (id) => {
  return db.any(`SELECT * FROM comments WHERE comment_id = $1`, [id]);
};

Comment.create = (comment) => {
  return db.one(`INSERT INTO comments (comment_text)
  VALUES ($1) RETURNING *`, [comment.comment_text]);
};

Comment.update = (id, updatedComment) => {
  return db.none(`UPDATE comments SET comment_text=$1 WHERE comment_id=$2`, [updatedComment.comment_text, updatedComment.comment_id]);

};

//delete function
Comment.delete = id => {
  return db.result(`DELETE FROM comments WHERE comment_id=  $1`, [id]);
};



console.log('Comment.js connected');


module.exports = Comment;

