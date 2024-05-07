const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

router.use(bodyParser.json());


router.get("/all-requests", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/waiting", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept WHERE Accept = 0";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/accepted", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept natural join tb_Login WHERE Accept = 1";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/refused", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept WHERE Accept = 2";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/admin", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Si l'en-tête Authorization est manquant, renvoyer une erreur 401 Unauthorized
        return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID;

    // Requête SQL pour récupérer les données des clients acceptés et administrateurs où l'ID du client correspond à celui du token
    let sql = "SELECT * FROM tb_Login INNER JOIN tb_clients ON tb_Login.ID_Client = tb_clients.ID_Client INNER JOIN tb_clients_accept ON tb_clients.ID_Client = tb_clients_accept.ID_Client WHERE tb_clients_accept.Accept = 1 AND tb_Login.admin = true AND tb_clients.ID_Client = ?";

    connection.query(sql, [clientID], function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving admin client data:", err);
            res.status(500).json({ error: "Error retrieving admin client data from the database" });
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du client administrateur
            res.status(200).json(result);
        }
    });
});

router.get("/customers", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept natural join tb_Login natural join tb_country WHERE Accept = 1 AND admin = 0;";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

router.get("/admin-team", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept natural join tb_Login natural join tb_country WHERE Accept = 1 AND admin = 1;";
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

router.put("/new-admin/:id", (req, res) => {
    const clientId = req.params.id;

    // Requête SQL pour mettre à jour la valeur de la colonne Admin à true
    let sql = "UPDATE tb_Login SET admin = true WHERE ID_Client = ?";
    connection.query(sql, [clientId], function (err, result) {
        if (err) {
            console.error("Error updating client acceptance:", err);
            res.status(500).send("Error updating client acceptance");
        } else {
            res.status(200).send("Client acceptance updated successfully");
        }
    });
});

router.put("/not-admin/:id", (req, res) => {
    const clientId = req.params.id;

    // Requête SQL pour mettre à jour la valeur de la colonne Admin à false
    let sql = "UPDATE tb_Login SET admin = false WHERE ID_Client = ?";
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