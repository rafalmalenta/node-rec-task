const mysql = require("mysql");
let connection = require("./databaseConnect");

function saveMovie (connect,movie,user_id){

    var sql = `INSERT INTO MOVIES (title, released,genre,director,user_posted_id,posting_timestamp)
                VALUES ('${movie.title}', 
                        '${movie.released}',
                        '${movie.genre}',
                        '${movie.director}',
                        ${user_id},
                        NOW())`;
    const con = connect();
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
   // console.log(dsadas)

}
module.exports = saveMovie;