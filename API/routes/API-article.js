const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");


// Get all articles data
router.get("/articles", (req, res) => {
    var sql = "SELECT * FROM tb_articles"; // Add an 's' to this table name in order to match with other tables nomenclature
    connection.query(sql, function (err, result, fields) {

        res.send(result);
    });
});

// Get article data by his ID
router.get("/articles/:id", (req, res) => {
    var sql = "SELECT * FROM tb_articles WHERE ID_Article = ?";
    connection.query(sql, [req.params.id], function (err, result, fields) {

        res.send(result);
    });
});
/*
// Create new article
router.post("/articles/createArticle", (req, res) => {


    // Create a SQL query to insert a new article into the database
    const sql = "INSERT INTO tb_articles (ID_Category, ID_Brand, Name, Small_Description, Description, Single_Price, Min_To_By, Stock, On_Market) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [ID_Category, ID_Brand, Name, Small_Description || null, Description || null, Single_Price, Min_To_By || null, Stock, On_Market];
    connection.query(sql, values, (err, result) => {
        res.send(result);
    });
});*/

// Update specific article by ID
router.put("/articles/:id", (req, res) => {
    const body = req.body;

})

// Delete an article by his ID
router.delete("/articles/:id", (req, res) => {
    const articleId = req.params.id;

    const sql = "DELETE FROM tb_articles WHERE ID_Article = ?";

    connection.query(sql, [articleId], (err, result) => {

        // Deletion successful
        res.status(200).json({ message: "Article deleted successfully" });
    });
});


module.exports = router;