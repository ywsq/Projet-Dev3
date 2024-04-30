const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");




router.get("/waiting", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept WHERE Accept = 0";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/accepted", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept WHERE Accept = 1";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/refused", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept WHERE Accept = 2";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.put("/new-accept/:id", (req, res) => {
    const clientId = req.params.id;

    // Requête SQL pour mettre à jour la valeur de la colonne Accept à 1 pour le client spécifié par son ID
    let sql = "UPDATE tb_clients_accept SET Accept = 1 WHERE ID_Client = ?";
    connection.query(sql, [clientId], function (err, result) {
        if (err) {
            console.error("Error updating client acceptance:", err);
            res.status(500).send("Error updating client acceptance");
        } else {
            res.status(200).send("Client acceptance updated successfully");
        }
    });
});

router.put("/new-refuse/:id", (req, res) => {
    const clientId = req.params.id;

    // Requête SQL pour mettre à jour la valeur de la colonne Accept à 1 pour le client spécifié par son ID
    let sql = "UPDATE tb_clients_accept SET Accept = 2 WHERE ID_Client = ?";
    connection.query(sql, [clientId], function (err, result) {
        if (err) {
            console.error("Error updating client acceptance:", err);
            res.status(500).send("Error updating client acceptance");
        } else {
            res.status(200).send("Client acceptance updated successfully");
        }
    });
});


module.exports = router