const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const verifyToken = (req,res,next) => {
    const token = req.headers['authorization'].split(" ")[1];

    jwt.verify(token,JWT_SECRET,(error,user) => {
        if(error) return res.sendStatus(403);

        req.user = user;
    })

    next();
}

module.exports = verifyToken