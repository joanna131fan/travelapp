const { validationResult } = require('express-validator');

const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = process.env.SECRET;

const handleNewUser = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            // Validation errors
            return res.status(400).json({ success: false, errors: errors.array() });
        }
    
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await db.User.create({ username: username, email: email, password: hashedPassword});
    
        // TODO: implement a "stay signed in" feature
        const token = jwt.sign({ email: newUser.email, id: newUser._id}, SECRET, { expiresIn: "3d" });
        // https://www.geeksforgeeks.org/jwt-authentication-with-node-js/
        // https://github.com/panshak/accountill/blob/master/server/controllers/user.js

        res.status(200).json({ success: true, message: 'The server received the data', token });

        next();
    } catch(err) {
        console.log(err);
    }
};


const handleLogin = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            // Validation errors
            return res.state(400).json({ success: false, errors: errors.array() });
        }

        const { username, password } =  req.body;

        const user = await db.User.findOne({ username: username });
        if (user && user.password == password) {
            const token = jwt.sign({ email: user.email, id: user._id}, SECRET, { expiresIn: "3d"});
            res.status(200).json({ success: true, message: "Server received the data", token});
        }
        else {
            return res.state(400).json({ success: false, errors: errors.array() });
        }
    } catch(err) {
        console.log(error);
    }
}

module.exports = { handleNewUser, handleLogin };
//1/16 - TODO: implement user sessions with JWT or session tokens (https://devops.com/session-tokens-vs-jwts-choosing-your-session-management-solution/)