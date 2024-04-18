const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// basic url : /API/

router.get("/", (req, res) => {
    res.send("You are in the API/article page");
});


router.get("/articles", (req, res) => {
    let sql = "select tb_articles.ID_Category, tb_articles.ID_Article, tb_articles.Name, tb_articles.Small_Description, tb_articles.Description, tb_articles.Single_Price, tb_articles.Min_To_By, tb_articles.On_Market, tb_category.Category_Name, tb_image_article.Image, tb_image_article.Order from tb_articles natural join tb_category left outer join tb_image_article ON tb_articles.ID_Article = tb_image_article.ID_Article;";
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


router.get("/articleDetails/:id", (req, res) => {
    let sql = "select * \n" +
        "from tb_articles\n" +
        "join tb_category\n" +
        "ON tb_articles.ID_Category = tb_category.ID_Category \n" +
        "join tb_brands\n" +
        "ON tb_articles.ID_Brand = tb_brands.ID_Brand \n" +
        "join tb_image_article\n" +
        "ON tb_articles.ID_Article = tb_image_article.ID_Article where tb_articles.ID_Article like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});


router.get("/articleName/:name", (req, res) => {
    let sql = "select * from tb_articles where Name like " + req.params.name;
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
