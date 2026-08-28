const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res)=>{
    const {username, email, password} = req.body;

    if(await User.findOne({email})) res.status(400).json({message:"User already exist"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({username, password:hashedPassword, email});
    await newUser.save();

    res.status(201).json({message:"User has created"});
})

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) res.status(400).json({message:"Bad cridentials"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) res.status(400).json({message:"Bad credentials"});

    const payload = {id:user._id, email:user.email};

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"2m"});
    res.json({token})
})

module.exports = router;