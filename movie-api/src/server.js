const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3001;
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const app = express();

app.use(bodyParser.json());
app.get("/", (req, res, next) =>{
  console.log("hej");
});


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
