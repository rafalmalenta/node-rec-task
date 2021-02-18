const PremiumUserAddMovie = require("./PremiumUserAddMovie");
const BasicUserAddMovie = require("./BasicUserAddMovie");

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
        }catch (e){ throw e;    }
    }
}

module.exports = MovieAdder;