const fetchMovie = require("./fetchMovie");
const DatabaseHandler = require("../DatabaseHandler/DatabaseHandler");
//const connect = require("../DatabaseHandler/databaseConnect");

class PremiumUserAddMovie{
    constructor(title,user,connect) {
        this.title = title;
        this.user = user;
        this.connect = connect;
    }
    async handle() {
        try {
            let movie = await fetchMovie(this.title);
            let Database = new DatabaseHandler(this.connect, this.user);
            await Database.saveMovie(movie, this.user.userId).catch();
        } catch (e) {
            throw e;
        }
    }
}

module.exports = PremiumUserAddMovie