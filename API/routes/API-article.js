const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");





router.get("/all-categories", (req, res) => {
    let sql = "select Category_Name from tb_category";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});




router.get("/all-infos/:id", (req, res) => {
    let sql = "select * \n" +
        "from tb_articles\n" +
        "join tb_category\n" +
        "ON tb_articles.ID_Category = tb_category.ID_Category \n" +
        "join tb_brands\n" +
        "ON tb_articles.ID_Brand = tb_brands.ID_Brand \n" +
        "join tb_image_article\n" +
        "ON tb_articles.ID_Article = tb_image_article.ID_Article where tb_articles.ID_Article like " + req.params.id;

    connection.query(sql, function (err, result, fields) {
        if (result.length == 0){

            let fallbackSql = "select * \n" +
                "from tb_articles\n" +
                "join tb_category\n" +
                "ON tb_articles.ID_Category = tb_category.ID_Category \n" +
                "join tb_brands\n" +
                "ON tb_articles.ID_Brand = tb_brands.ID_Brand \n" +
                "where tb_articles.ID_Article like " + req.params.id;

            connection.query(fallbackSql, function (fallbackErr, fallbackResult, fallbackFields) {
                if (fallbackErr) {
                    console.error("Fallback query failed:", fallbackErr);
                    // Handle fallback query failure appropriately
                    res.status(500).send("Error fetching data");
                } else {
                    // Send the result of the fallback query
                    res.send(fallbackResult);
                }
            });
        } else {
            // Send the result if the query was successful
            res.send(result);
        }
    });
});


router.get("/all", (req, res) => {
    let sql = "select tb_articles.ID_Category, tb_articles.ID_Article, tb_articles.Name, tb_articles.Small_Description, tb_articles.Description, tb_articles.Single_Price, tb_articles.Min_To_By, tb_articles.On_Market, tb_category.Category_Name, tb_image_article.Image, tb_image_article.Order from tb_articles natural join tb_category left outer join tb_image_article ON tb_articles.ID_Article = tb_image_article.ID_Article;";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});



router.get("/Category/:name", (req, res) => {
    let sql = "select * from tb_category natural join tb_articles where Category_Name like '" + req.params.name +"'";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});



router.get("/:id", (req, res) => {
    let sql = "select * from tb_articles where id_article like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});



module.exports = router
