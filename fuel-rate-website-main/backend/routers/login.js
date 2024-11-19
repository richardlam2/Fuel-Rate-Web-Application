const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

require("dotenv").config();

const router = express.Router();

// login route
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

        await db.query(sqlSearch,[username],async (err,result) => {
            if (err) {
                console.log(err);
                return next(new Error("Error searching database."));
            }
            if (result.length == 0) {
                console.log("Couldn't log in. User doesn't exist.");
                return next(new Error("User does not exist."));
            }
            else {
                let hashedPassword = result[0].password;
                if (await bcrypt.compare(password,hashedPassword)) {
                    console.log("Username and password match.");
                    console.log(result[0].userId);
                    res.send({id: result[0].userId});
                }
                else {
                    console.log("Password does not match.");
                    return next(new Error("Password is incorrect."));
                }
            }
        });
    });
});

module.exports = router;