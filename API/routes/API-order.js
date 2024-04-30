const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");



// Create a new order
router.post("/add", (req, res) => {
    // Get data from request body
    const { ID_Orders, ID_client, Order_Date, Availability_Date } = req.body;

    // Insert into database
    const sql = "INSERT INTO tb_orders (ID_Orders, ID_client, Order_Date, Availability_Date) VALUES (?, ?, ?, ?)";

    // Execute sql request
    connection.query(sql, [ID_Orders, ID_client, Order_Date, Availability_Date], (result) => {
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


module.exports = router;