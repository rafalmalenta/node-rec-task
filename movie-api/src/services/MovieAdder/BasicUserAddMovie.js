const fetchMovie = require("./fetchMovie");
const DatabaseHandler = require("../DatabaseHandler/DatabaseHandler");
//const connect = require("../DatabaseHandler/databaseConnect");

class BasicUserAddMovie{
    constructor(title,user,connect) {
        this.title = title;
        this.user = user;
        this.connect = connect;
    }
    async handle(){
        try {
            let Database = new DatabaseHandler(this.connect, this.user);
            let thisMonthMovies = await Database.countUserThisMonthMovies();
            if (thisMonthMovies < this.user.limit) {
                let movie = await fetchMovie(this.title);
                Database.saveMovie(movie, this.user.userId);
            }
            else throw "you exceeded yours monthly limit"
        }catch (e) {
            throw e;
        }
    }
}

module.exports = BasicUserAddMovie