const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// basic url : /API/

router.get("/", (req, res) => {
    res.send("You are in the API/article page");
});


router.get("/articles", (req, res) => {
    let sql = "select * from tb_articles natural join tb_category left outer join tb_image_article ON tb_articles.ID_Article = tb_image_article.ID_Article;";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});


router.get("/articleID/:id", (req, res) => {
    let sql = "select * from tb_articles where id_article like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});
router.get("/article/categories", (req, res) => {
    let sql = "select Category_Name from tb_category";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

router.get("/article/categories/:name", (req, res) => {
    let sql = "select * from tb_category natural join tb_articles where Category_Name like '" + req.params.name +"'";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});





module.exports = router
