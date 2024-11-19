const express = require('express');
const mysql = require('mysql');

require("dotenv").config();

const router = express.Router();

// quote history route
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
        const sqlSearch = "SELECT * FROM FuelQuote WHERE userId = ?";

        db.query(sqlSearch,[id],(err,result) => {
            if (err) {
                console.log(err);
                return next(new Error("Error searching database."));
            }
            console.log(result);
            res.send(result);
        });
    });
});

module.exports = router;