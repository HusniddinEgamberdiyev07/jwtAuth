const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization || "";
    const [schema, token] = authHeader.split(" ");

    if(!schema === "Bearer" || !token) res.status(401).json("Missing or invalid token");
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) {
            if(err.name === "TokenExpiredError") res.status(401).send("Expired token")
            else res.status(401).json("Invalid token")
        }
        req.user = {id:decoded.id, email:decoded.email};
        next();
    })
}