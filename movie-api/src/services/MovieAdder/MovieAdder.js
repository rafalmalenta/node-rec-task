const fetchMovie = require("./fetchMovie");
//const saveMovie = require("../DatabaseHandler/saveMovie");
const DatabaseHandler = require("../DatabaseHandler/DatabaseHandler");
const connect = require("../DatabaseHandler/databaseConnect");
class PremiumUserAddMovie{
    constructor(title,user,connect) {
        this.title = title;
        this.user = user;
        this.connect = connect;
    }
    async handle(){
        let movie = await fetchMovie(this.title);
        let Database = new DatabaseHandler(connect);
        Database.saveMovie( movie, this.user.id);
    }
}
class BasicUserAddMovie{
    constructor(title,user,connect) {
        this.title = title;
        this.user = user;
        this.connect = connect;
    }
    async handle(){
        let Database = new DatabaseHandler(connect);
        if(Database.countUserThisMonthMovies(this.user)>this.user.limit){
            let movie = await fetchMovie(this.title);
            Database.saveMovie(this.connect, movie, this.user.id);
        }
        else
            return  res.status(500).json({ error: "invalid payload" });
    }
}

class MovieAdder{
    addingStrategy = null;
    constructor(user,title,connect) {
        this.user = user;
        this.title = title;
        this.connect = connect;
    }
    chooseStrategy(){
        if(this.user.role === "premium")
            this.addingStrategy = new PremiumUserAddMovie(this.title,this.user,this.connect);
        else
            this.addingStrategy = new BasicUserAddMovie(this.title,this.user,this.connect);
    }
    execute(){
        //console.log(this.addingStrategy)
        return  this.addingStrategy.handle();
    }
}

module.exports = MovieAdder;