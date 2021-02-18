const promisedSQLQuery = require("./promisedSQLQuery");

class DatabaseHandler{
    constructor(connect,user) {
        this.connect = connect;
        this.user = user;
    }
    async saveMovie (movie){
        try {
            const sql = "INSERT INTO MOVIES (title, released,genre,director,user_posted_id,posting_timestamp) VALUES (?,?,?,?,?,NOW() )";
            const valuesArray = [movie.title, movie.released, movie.genre, movie.director, this.user.userId];
            await promisedSQLQuery(this.connect, sql, valuesArray);
        }catch (error){throw(error)};
    }
    async countUserThisMonthMovies(){
        return new Promise((resolve,reject)=>{
            let date = new Date();
            let currentYear = date.getFullYear();
            let currentMonth = date.getMonth() +1;
            if(currentMonth<10)
                currentMonth = "0" + currentMonth.toString();
            const sql =`SELECT COUNT(*) as moviesFromThisMonth from MOVIES where user_posted_id=${this.user.userId} and posting_timestamp like '${currentYear}-${currentMonth}%'`;
            promisedSQLQuery(this.connect,sql,null).then((res,err)=>{
                if(err) reject(err);
                resolve(res[0].moviesFromThisMonth);
            });
        });
    }
}

module.exports = DatabaseHandler;