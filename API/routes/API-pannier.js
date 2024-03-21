const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// basic url : /API/

router.get("/", (req, res) => {
    res.send("You are in the API/pannier page");
});

router.get("/pannierID/:id", (req, res) => {
    let sql = "select * from tb_shopping_cart_article where ID_Shopping_Cart like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

router.get("/pannierID/:id/articleID/:id", (req, res) => {
    let sql = "select * from tb_shopping_cart_article where ID_Shopping_Cart like " + req.params.id + "and id_article like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

module.exports = router