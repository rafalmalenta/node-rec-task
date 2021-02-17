CREATE TABLE MOVIES (
    movie_id  int AUTO_INCREMENT PRIMARY KEY not null,
    title varchar(100) unique,
    released  year,
    genre varchar(70),
    director varchar(40),
    user_posted_id int,
    posting_timestamp timestamp
);
