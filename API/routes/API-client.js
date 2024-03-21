const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// basic url : /API/

router.get("/", (req, res) => {
    res.send("You are in the API/client page");
});

router.get("/all-clients", (req, res) => {
    let sql = "select * from tb_clients";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

router.get("/clientID/:id", (req, res) => {
    let sql = "select * from tb_clients where id_client like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});


module.exports = router

