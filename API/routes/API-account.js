const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");

router.get("/request", (req, res) => {
    res.send("You are in the API/request page");
});

router.post("/add-request", (req, res) => {
    // Supposons que vous receviez les données nécessaires dans le corps de la requête
    const { companyName, country, address, email, phone, password } = req.body;
    console.log(req.body)
    // Assurez-vous d'effectuer une validation des données avant l'insertion
    let sql = "INSERT INTO tb_clients (Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number) VALUES (?, ?, ?, ?, ?)";
    let values = [ companyName, email, address, country, phone ];

    connection.query(sql, values, function (err, clientResult) {
        if (err) {
            console.error("Erreur lors de l'insertion dans la table 'tb_clients' : ", err);
            res.status(500).send("Erreur lors de l'insertion dans la table 'tb_clients'.");
        } else {
            // Récupérer l'ID du client nouvellement inséré
            const clientId = clientResult.insertId;

            // Insérer la valeur d'acceptation pour le client dans la table 'tb_clients_accept'
            let acceptSql = "INSERT INTO tb_clients_accept (ID_Client, Accept) VALUES (?, ?)";
            let acceptValues = [clientId, 0];

            connection.query(acceptSql, acceptValues, function (acceptErr, acceptResult) {
                if (acceptErr) {
                    console.error("Erreur lors de l'insertion dans la table 'tb_clients_accept' : ", acceptErr);
                    res.status(500).send("Erreur lors de l'insertion dans la table 'tb_clients_accept'.");
                } else {
                    console.log("Nouveau client ajouté avec succès !");
                    res.status(200).send("Nouveau client ajouté avec succès !");
                }
            });

            // Insérer le password pour le client dans la table 'tb_Login'
            let passwordSql = "INSERT INTO tb_Login (ID_Client, Password) VALUES (?, ?)";
            let passwordValues = [clientId, password];

            connection.query(passwordSql, passwordValues, function (acceptErr, acceptResult) {
                if (acceptErr) {
                    console.error("Erreur lors de l'insertion dans la table 'tb_Login' : ", acceptErr);
                    res.status(500).send("Erreur lors de l'insertion dans la table 'tb_Login'.");
                } else {
                    console.log("Password ajouté avec succès !");
                    res.status(200).send("Password ajouté avec succès !");
                }
            })
        }
    });
});

router.get("/display-request", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept WHERE Accept = 0";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/display-request/accepted", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept WHERE Accept = 1";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/display-request/refused", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept WHERE Accept = 2";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.put("/accept-request/:id", (req, res) => {
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

router.put("/refuse-request/:id", (req, res) => {
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

module.exports = router;
