const express = require("express");
const bodyParser = require("body-parser");
const verifyToken = require("./services/verifyToken")
const basicDecorator = require("./services/basicDecorator");
const saveMovie = require("./services/saveMovie");
let connect = require("./services/databaseConnect");

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
  let mockMovie ={
    title: "terminator",
    genre: "action",
    released: "2011-03-01",
    director: "Ben Hernandez",
  }
  saveMovie(connect,mockMovie,1);

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
