const connect = require("./databaseConnect");
class DatabaseHandler{
    constructor(connect,user_id) {
        this.connect = connect;
        this.user_id = user_id;
    }
    saveMovie (movie){
        const sql ="INSERT INTO MOVIES (title, released,genre,director,user_posted_id,posting_timestamp) VALUES (?,?,?,?,?,NOW() )";
        const valuesArray = [movie.title, movie.released, movie.genre, movie.director, this.user_id];
        const con = this.connect();
        con.query(sql,valuesArray, function (err, result) {
            if (err) throw err;
            return true;
        });
        con.end();
    }
    countUserThisMonthMovies(){
        let date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth() +1;
        if(currentMonth<10)
            currentMonth = "0" + currentMonth.toString();
        const sql =`SELECT COUNT(*) as moviesFromThisMonth from MOVIES where user_posted_id=2 and posting_timestamp like '${currentYear}-${currentMonth}%'`;
        const con = this.connect();
        con.query(sql, function (err, result) {
             if (err) throw err;
             return result[0].moviesFromThisMonth;
        });
        con.end();
    }
}

module.exports = DatabaseHandler;