-- \c fe_app

DELETE FROM comments;

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    comment_text VARCHAR(255)
    );