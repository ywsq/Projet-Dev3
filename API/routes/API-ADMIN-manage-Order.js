const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// Get all orders data
router.get("/all", (req, res) => {
    // #swagger.tags = ['Admin orders']
    // #swagger.summary = 'Return all orders'
    let sql = "SELECT * FROM tb_orders";
    connection.query(sql, function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving data from the database: ", err);
            res.status(500).json({error: "Error retrieving data from the database"});
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du client administrateur
            res.status(200).json(result);
        }
    });
});


// Delete an order by its ID
router.put("/cancel/:id", (req, res) => {
    // #swagger.tags = ['Admin orders']
    // #swagger.summary = 'Cansel an order base on ID'
    const orderId = req.params.id;

    // SQL request to delete the order from database
    const sql = "UPDATE tb_orders SET Status = 'Cancel' WHERE ID_Orders = ?;";

    // execute SQL request
    connection.query(sql, [orderId], (err, result) => {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving data from the database: ", err);
            res.status(500).json({error: "Error retrieving data from the database"});
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du client administrateur
            res.status(200).json(result);
        }
    });
});

// Delete an order by its ID
router.put("/uncancel/:id", (req, res) => {
    // #swagger.tags = ['Admin orders']
    // #swagger.summary = 'Uncancel an order base on ID'
    const orderId = req.params.id;

    // SQL request to delete the order from database
    const sql = "UPDATE tb_orders SET Status = 'In review' WHERE ID_Orders = ?;";

    // Execute SQL request
    connection.query(sql, [orderId], (err, result) => {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving data from the database: ", err);
            res.status(500).json({error: "Error retrieving data from the database"});
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du client administrateur
            res.status(200).json(result);
        }
    });
});

module.exports = router