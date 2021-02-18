const express = require("express");
const bodyParser = require("body-parser");
const verifyToken = require("./services/verifyToken")
const basicDecorator = require("./services/basicDecorator");
const premiumDecorator = require("./services/premiumDecorator");
let connect = require("./services/DatabaseHandler/databaseConnect");
const MovieAdder =require("./services/MovieAdder/MovieAdder");
const MovieViewer = require("./services/MovieViewer/MovieViewer")

const PORT = 3001;

const app = express();

app.use(bodyParser.json());
app.use(verifyToken)

app.post("/movies",(req,res) =>{

  let ConnectedUser;
  if(req.user.role === "premium"){
    ConnectedUser = premiumDecorator(req.user);
  }
  else if(req.user.role === "basic"){
    ConnectedUser = basicDecorator(req.user);
  }

  (async function x() {
    try {
      let Adder = new MovieAdder(ConnectedUser, req.body.title, connect);
      Adder.chooseStrategy();
      await Adder.execute();
      return res.status(201).json({response: "created"});
    } catch (err) {
      return res.status(500).json({error: err});
    }
  })()

})
app.get("/movies",(req,res)=>{
  const Viewer = new MovieViewer(req.user,connect)
  Viewer.getUserMovies().then(userMovies=> {
    return res.status(200).json({ userMovies })
  });
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
