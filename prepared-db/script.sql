CREATE TABLE MOVIES (
    movie_id  int AUTO_INCREMENT PRIMARY KEY not null,
    tittle varchar(100),
    released  date,
    genre varchar(20),
    directory varchar(20),
    user_posted_id int,
    posting_timestamp timestamp
);
