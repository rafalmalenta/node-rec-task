const express = require("express");
const bodyParser = require("body-parser");
const verifyToken = require("./services/verifyToken")
const basicDecorator = require("./services/basicDecorator");
const premiumDecorator = require("./services/premiumDecorator");
let connect = require("./services/DatabaseHandler/databaseConnect");
const MovieAdder =require("./services/MovieAdder/MovieAdder");

const PORT = 3001;

const app = express();

app.use(bodyParser.json());
app.use(verifyToken)

app.post("/movies",(req,res,next) =>{

  let ConnectedUser;
  if(req.user.role === "premium"){
    ConnectedUser = premiumDecorator(req.user);
  }
  else if(req.user.role === "basic"){
    ConnectedUser = basicDecorator(req.user);
  }
  let Adder = new MovieAdder(ConnectedUser,req.body.title,connect);
  Adder.chooseStrategy();
  Adder.execute();

})

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`movie svc running at port ${PORT}`);
});
