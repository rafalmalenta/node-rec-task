const DatabaseHandler = require("../DatabaseHandler/DatabaseHandler");
const connect = require("../DatabaseHandler/databaseConnect");

class MovieViewer{
    constructor(user,connect) {
        this.user = user;
        this.connect = connect;
    }
    async getUserMovies(){
        try {
            let Database = new DatabaseHandler(connect, this.user);
            return await Database.getUserMovies(this.user);
        }catch (e){
            throw e;
        }
    }
}

module.exports = MovieViewer;