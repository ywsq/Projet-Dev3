const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// basic url : /API/

router.get("/", (req, res) => {
    res.send("You are in the API/pannier page");
});

router.get("/pannierID/:id", (req, res) => {
    let sql = "SELECT * FROM tb_shopping_cart_article natural join tb_articles where ID_Shopping_Cart like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

router.get("/pannierID/:id/articleID/:u", (req, res) => {
    let sql = "SELECT * FROM tb_articles join tb_cart_client_link WHERE ID_Article LIKE " + req.params.id + " and ID_Shopping_Cart like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

module.exports = router