const mysql = require("mysql");
let connection = require("./databaseConnect");

function saveMovie (connect,movie,user_id){

    const sql =   `INSERT INTO MOVIES (title, released,genre,director,user_posted_id,posting_timestamp) VALUES (?,?,?,?,?,NOW() )`;
    const valuesArray = [movie.title, movie.released, movie.genre, movie.director, user_id];
    const con = connect();
    con.query(sql,valuesArray, function (err, result) {
        if (err) throw err;
        return true;
    });

}
module.exports = saveMovie;