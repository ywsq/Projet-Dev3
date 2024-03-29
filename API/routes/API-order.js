const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");


// Get all orders data
router.get("/orders",(req, res) => {
    let sql = "SELECT * FROM tb_orders";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

// Get order data by its ID
router.get("/orders/:id", (req, res) => {
    const orderID = req.params.id;

    // SQL query to select order data by ID
    const sql = "SELECT * FROM tb_orders WHERE ID_Orders = ?";

    // Execute the SQL query with orderID
    connection.query(sql, [orderID], (err, result) => {

        // Send the order data back to the client
        res.send(result);
    });
});

// Create a new order
router.post("/orders", (req, res) => {
    // Get data from request body
    const { ID_Orders, ID_client, Order_Date, Availability_Date } = req.body;

    // Insert into database
    const sql = "INSERT INTO tb_orders (ID_Orders, ID_client, Order_Date, Availability_Date) VALUES (?, ?, ?, ?)";

    // Execute sql request
    connection.query(sql, [ID_Orders, ID_client, Order_Date, Availability_Date], (result) => {
        res.send(result);
    });
});
/*
// Update a specific order by its ID
router.put("/orders/update/:id"/:amount/:enddate/, (req, res) => {
    const orderId = req.params.id;

    // Get information from request's body
    const { ID_Orders, ID_client, Order_Date, Availability_Date } = req.body;

    // SQL request to update database
    const sql = "UPDATE tb_orders SET ID_Orders = ?, ID_client = ?, Availability_Date = req.params.availability WHERE ID_Orders = req.params.id";

    // Execute SQL request
    connection.query(sql, [ID_Orders, ID_client, Order_Date, Availability_Date], (err, result) => {
        res.send(result)
    });
});
*/
// Delete an order by its ID
router.delete("/orders/:id", (req, res) => {
    const orderId = req.params.id;

    // SQL request to delete the order from database
    const sql = "DELETE FROM tb_orders WHERE ID_Order = ?";

    // Execute SQL request
    connection.query(sql, [orderId], (err, result) => {
        res.send(result);
    });
});

module.exports = router;