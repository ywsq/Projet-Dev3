const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

const sender = "gaetan.carbonnelle1@gmail.com";
const password = "hsot ijrh dbud rfef";

async function sendEmail(email) {
    const recipients = [sender, email];

    // Créer un transporteur SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: password
        }
    });

    // Définir le contenu de l'email
    let mailOptions = {
        from: sender,
        to: recipients.join(', '),
        subject: "Email accepted on StarMobile",
        text: `Congratulations,\n\n Your account (${email}) have been accepted by the admin !\n\n StarMobile`
    };

    try {
        // Envoyer l'email
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}




router.use(bodyParser.json());


router.get("/all-requests", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept";
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

router.get("/waiting", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept WHERE Accept = 0";
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

router.get("/accepted", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept natural join tb_Login WHERE Accept = 1";
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

router.get("/refused", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_country natural join tb_clients natural join tb_clients_accept WHERE Accept = 2";
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

router.get("/admin", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Si l'en-tête Authorization est manquant, renvoyer une erreur 401 Unauthorized
        return res.status(401).json({error: "Authorization header is missing"});
    }

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID;

    // Requête SQL pour récupérer les données des clients acceptés et administrateurs où l'ID du client correspond à celui du token
    let sql = "SELECT * FROM tb_Login INNER JOIN tb_clients ON tb_Login.ID_Client = tb_clients.ID_Client INNER JOIN tb_clients_accept ON tb_clients.ID_Client = tb_clients_accept.ID_Client WHERE tb_clients_accept.Accept = 1 AND (tb_Login.admin = true OR admin LIKE 4) AND tb_clients.ID_Client = ?";

    connection.query(sql, [clientID], function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving admin client data:", err);
            res.status(500).json({error: "Error retrieving admin client data from the database"});
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

router.get("/admin-team", (req, res) => {
    // Requête SQL pour récupérer toutes les données de la table tb_clients_accept où Accept = 0
    let sql = "SELECT * FROM tb_clients natural join tb_clients_accept natural join tb_Login natural join tb_country WHERE Accept = 1 AND (admin = 1 OR admin LIKE 4);";
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

router.put("/new-accept/:id", (req, res) => {
    const clientId = req.params.id;
    const email = req.body.email;

    // Requête SQL pour mettre à jour la valeur de la colonne Accept à 1 pour le client spécifié par son ID
    let sql = "UPDATE tb_clients_accept SET Accept = 1 WHERE ID_Client = ?";
    connection.query(sql, [clientId], function (err, result) {
        if (err) {
            console.error("Error updating client acceptance:", err);
            res.status(500).send("Error updating client acceptance");
        } else {
            sendEmail(email)
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
    let sql = "UPDATE tb_Login SET admin = false WHERE ID_Client = ? and admin not like 4;";
    connection.query(sql, [clientId], function (err, result) {
        if (err) {
            console.error("Error updating client acceptance:", err);
            res.status(500).send("Error updating client acceptance");
        } else {
            res.status(200).send("Client acceptance updated successfully");
        }
    });
});

// Admin ajouté directement par l'admin sur son interface
router.post("/addAdmin", (req, res) => {
    // Supposons que vous receviez les données nécessaires dans le corps de la requête
    const {companyName, country, address, email, phone, password} = req.body;
    // Assurez-vous d'effectuer une validation des données avant l'insertion
    let sql = "INSERT INTO tb_clients (Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number) VALUES (?, ?, ?, ?, ?)";
    let values = [companyName, email, address, country, phone];

    //insertion client infos
    connection.query(sql, values, function (err, clientResult) {
        if (err) {
            console.error("Erreur lors de l'insertion dans la table 'tb_clients' : ", err);
            res.status(500).send("Erreur lors de l'insertion dans la table 'tb_clients'.");
        } else {
            // Récupérer l'ID du client nouvellement inséré
            const clientId = clientResult.insertId;

            // Insérer la valeur d'acceptation pour le client dans la table 'tb_clients_accept'
            let acceptSql = "INSERT INTO tb_clients_accept (ID_Client, Accept) VALUES (?, ?)";
            let acceptValues = [clientId, 1];

            //insertion tableau acceptation par admin
            connection.query(acceptSql, acceptValues, function (acceptErr, acceptResult) {
                if (acceptErr) {
                    console.error("Erreur lors de l'insertion dans la table 'tb_clients_accept' : ", acceptErr);
                    res.status(500).send("Erreur lors de l'insertion dans la table 'tb_clients_accept'.");
                } else {
                    console.log("Nouveau client ajouté avec succès !");

                    // Insérer le password pour le client dans la table 'tb_Login'
                    let passwordSql = "INSERT INTO tb_Login (ID_Client, Password, admin) VALUES (?, ?, ?)";
                    let passwordValues = [clientId, password, 1];

                    //insertion du password hashé
                    connection.query(passwordSql, passwordValues, function (acceptErr, acceptResult) {
                        if (acceptErr) {
                            console.error("Erreur lors de l'insertion dans la table 'tb_Login' : ", acceptErr);
                            res.status(500).send("Erreur lors de l'insertion dans la table 'tb_Login'.");
                        } else {
                            console.log("Password ajouté avec succès !");

                            let shoppingCartsql = "INSERT INTO tb_cart_client_link (ID_Shopping_Cart, ID_Client) VALUES (?, ?)"
                            let shoppingCartValues = [clientId, clientId]

                            //insertion du shopping cart
                            connection.query(shoppingCartsql, shoppingCartValues, function (acceptErr, acceptResult) {
                                if (acceptErr) {
                                    console.error("Erreur lors de l'insertion dans la table 'tb_cart_client_link' : ", acceptErr);
                                    res.status(500).send("Erreur lors de l'insertion dans la table 'tb_cart_client_link'.");
                                } else {
                                    console.log("le cart à été ajouter avec succes !");

                                    res.status(200).send("Nouveau client ajouté avec succès !");
                                }
                            })
                        }
                    })
                }
            });


        }
    });
});

module.exports = router