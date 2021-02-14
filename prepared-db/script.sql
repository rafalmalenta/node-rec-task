CREATE TABLE MOVIES (
    movie_id  int AUTO_INCREMENT PRIMARY KEY not null,
    title varchar(100),
    released  date,
    genre varchar(20),
    director varchar(20),
    user_posted_id int,
    posting_timestamp timestamp
);
