const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// Get all orders data
router.get("/all",(req, res) => {
    let sql = "SELECT * FROM tb_orders";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});


// Delete an order by its ID
router.delete("/delete/:id", (req, res) => {
    const orderId = req.params.id;

    // SQL request to delete the order from database
    const sql = "DELETE FROM tb_orders WHERE ID_Order = ?";

    // Execute SQL request
    connection.query(sql, [orderId], (err, result) => {
        res.send(result);
    });
});

module.exports = router