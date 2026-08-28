const express = require("express");
const connectDb = require("./config/db");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");

connectDb();
require("dotenv").config();

const app = express();

app.use(express.json())

app.get("/", auth, async (req, res)=>{
    res.send("Welcome ");
})

app.use("/auth", authRoutes);

app.use((err, req, res, next)=>{
    res.status(500).json(err.message)
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})