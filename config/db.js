const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose.connect("mongodb://localhost:27017/isekaiWeb")
    .then(()=>{
        console.log("Db is connected");
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = connectDb;