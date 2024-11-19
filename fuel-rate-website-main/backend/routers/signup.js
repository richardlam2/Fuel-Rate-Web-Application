const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

require("dotenv").config();
const router = express.Router();

// signup route
router.post('/', async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    // check if username and password are within length and username doesnt have any spaces
    if (username.length > 100) {
        return next(new Error("Username is too long."));
    }
    if (username.includes(" ")) {
        return next(new Error("Username cannot include spaces."));
    }
    if (password.length > 100) {
        return next(new Error("Password is too long."));
    }

    // encrypt password
    let hashedPassword = await bcrypt.hash(password,10);
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    db.connect(async (err) => {
        if (err) {
            console.log(err);
            return next(new Error("Error connecting to database.")); 
        }
        const sqlSearch = "SELECT * FROM UserCredentials WHERE username = ?";
        const sqlInsert = "INSERT INTO UserCredentials VALUES(0,?,?)"

        await db.query(sqlSearch,[username], async (err,result) => {
            if (err) {
                console.log(err);
                return next(new Error("Error searching database."));
            }
            if (result.length != 0)  {
                console.log("Failed to create account. User already exists.")
                return next(new Error("User already exists."));
            }
            else {
                await db.query(sqlInsert,[username,hashedPassword], async (err,result) => {
                    if (err) {
                        console.log(err);
                        return next(new Error("Error adding user to database."));  
                    }
                    console.log("Created new user.");
                    res.send("Sign up successful!");
                });
            }
        });
    });
});

module.exports = router;