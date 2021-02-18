const fetchMovie = require("./fetchMovie");
const DatabaseHandler = require("../DatabaseHandler/DatabaseHandler");
const connect = require("../DatabaseHandler/databaseConnect");
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
class BasicUserAddMovie{
    constructor(title,user,connect) {
        this.title = title;
        this.user = user;
        this.connect = connect;
    }
    async handle(){
       try {
            let Database = new DatabaseHandler(connect, this.user);
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
    async execute(){
        try {
            return await this.addingStrategy.handle().catch();
        }catch (e){
            throw "e";
        }
    }
}

module.exports = MovieAdder;