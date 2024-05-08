const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// Search articles by given keywords
router.get("/search", (req, res) => {
    const keyword = req.query.q;

    // SQL query to search articles by keyword
    const sql = "SELECT * FROM tb_articles WHERE Name LIKE ?";

    // Execute the SQL query with the keyword
    connection.query(sql, [`%${keyword}%`], (err, result) => {

        // Send the search results back to the client
        res.send(result);
    });
});


module.exports = router;
