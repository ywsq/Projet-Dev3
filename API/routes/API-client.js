const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

// basic url : /API/

router.get("/client", (req, res) => {
    res.send("You are in the API/client page");
});

// Get data about all clients
router.get("/clients", (req, res) => {
    var sql = "select * from tb_clients";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

// Get client's data by his ID
router.get("/clients/:id", (req, res) => {
    var sql = "select * from tb_clients where id_client like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

// Create a new client
router.post("/clients", async (req, res) => {
    try {
        // Get data of the new client from the request body
        const {Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number} = req.body;

        // Create the SQL query to insert the new client into the database
        const [result] = await connection.promise().query("INSERT INTO tb_clients (Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number) VALUES (?, ?, ?, ?, ?)", [Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number]);

        // Check if the insertion was successful and send the response
        if (result.affectedRows > 0) {
            res.status(201).json({message: "Client created successfully", clientId: result.insertId});
        } else {
            res.status(500).json({message: "Failed to create client"});
        }
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});


// Update the information of a specific client by ID
router.put("/clients/:id", (req, res) => {
    // Get the client ID to update from the request parameters
    const clientId = req.params.id;

    // Get the new information of the client from the request body
    const {Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number} = req.body;

    // Create the SQL query to update the client information in the database
    const sql = "UPDATE tb_clients SET Society_Name = ?, Mail_Address = ?, Addresse = ?, ID_Country = ?, Phone_Number = ? WHERE ID_Client = ?";

    // Execute the SQL query with the new information of the client and its ID
    connection.query(sql, [Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number, clientId], (err, result) => {

    });
});

// Delete a specific client by ID
router.delete("/clients/:id", (req, res) => {
    // Get the client ID to delete from the request parameters
    const clientId = req.params.id;


    // Create the SQL query to delete the client from the database
    const sql = "DELETE FROM tb_clients WHERE ID_Client = ?";

    // Execute the SQL query with the client ID to delete
    connection.query(sql, [clientId], (err, result) => {
    });
});


module.exports = router;

