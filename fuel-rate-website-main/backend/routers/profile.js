const express = require('express');
const mysql = require('mysql');

require("dotenv").config();

const router = express.Router();

// profile route
router.get('/:userId', (req,res,next) => {
    let id = req.params.userId;

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
        if (err) {
            console.log(err);
            return next(new Error("Error connecting to database."));
        }
        const sqlSearch = "SELECT userId, name, address1, address2, city, state, zipcode FROM ClientInformation WHERE userId = ?";

        db.query(sqlSearch,[id],(err,result) => {
            if (err) {
                console.log(err);
                return next(new Error("Error searching database."));
            }
            console.log(result[0]);
            res.send(result[0]);
        });
    });
});

router.post('/', (req,res,next) => {
    let userId = req.body.userId;
    let name = req.body.name;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zipcode;

    if (name.length == 0) {
        return next(new Error("You must submit your full name."));
    }
    if (name.length > 50) {
        return next(new Error("Name cant be over 50 characters."));
    }
    if (address1.length == 0) {
        return next(new Error("You must submit your address."));
    }
    if (address1.length > 100) {
        return next(new Error("Address1 cant be over 100 characters."));
    }
    if (address2.length > 100) {
        return next( new Error("Address2 cant be over 100 characters."));
    }
    if (city.length == 0) {
        return next(new Error("You must submit your city."));
    }
    if (city.length > 100) {
        return next(new Error("City cant be over 100 characters."));
    }
    if (state.length != 2) {
        return next(new Error("You must submit a valid state."));
    }
    if (zipcode.length > 9 || zipcode.length < 5) {
        return next(new Error("Zipcode must be within 5 to 9 characters."));
    }
    if (isNaN(zipcode)) {
        return next(new Error("Zipcode can only contain digits."));
    }

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
        if (err) {
            console.log(err);
            return next(new Error("Error connecting to database."));
        }
        const sqlSearch = "SELECT * FROM ClientInformation WHERE userId = ?";
        const sqlInsert = "INSERT INTO ClientInformation VALUES(0,?,?,?,?,?,?,?)";
        const sqlUpdate = "UPDATE ClientInformation SET name = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE userId = ?";

        db.query(sqlSearch,[userId],(err,result) => {
            if (err) {
                console.log(err);
                return next(new Error("Error searching database."));
            }
            if (result.length == 0)  {
                db.query(sqlInsert,[userId,name,address1,address2,city,state,zipcode],(err,result) => {
                    if (err) {
                        console.log(err);
                        return next(new Error("Error adding user info in database."));
                    }
                    console.log("Added user profile.");
                    res.send("Added profile.");
                });
            }
            else {
                db.query(sqlUpdate,[name,address1,address2,city,state,zipcode,userId],(err,result) => {
                    if (err) {
                        console.log(err);
                        return next(new Error("Error updating user info in database."));
                    }
                    console.log("Updated user profile.");
                    res.send("Updated profile.");
                });
            }
        });
  
    });
});

module.exports = router;