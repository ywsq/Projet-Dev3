const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const authenticateJWT = require("../middlewares/authenticateJWT");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config({ path: '../.env' })

const sender = "gaetan.carbonnelle1@gmail.com";
const password = "hsot ijrh dbud rfef";

async function sendEmail(email) {
    const recipients = [sender, email];

    // crée un transporteur SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: password
        }
    });

    // définir le contenu de l'email
    let mailOptions = {
        from: sender,
        to: recipients.join(', '),
        subject: "Successful account creation on StarMobile",
        text: `Hello ${email},\n\n You have successfully create your account on StarMobile webpage, \n Please wait for the admin to accept you. \n\n StarMobile`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}



router.get('/', authenticateJWT, async (req, res) => {
    // #swagger.tags = ['clients']
    // #swagger.summary = 'Return all client'
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        // Si l'en-tête Authorization est manquant, renvoyer une erreur 401 Unauthorized
        return res.status(401).json({error: "Authorization header is missing"});
    }

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID;

    let sql = "select * from tb_clients natural join tb_country where ID_Client like ?;"
    connection.query(sql, [clientID], function (err, result) {
        if (err) {
            // en cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving client data:", err);
            res.status(500).json({error: "Error retrieving client data from the database"});
        } else {
            // si la requête s'est exécutée avec succès, renvoyer les données du client
            res.status(200).json(result);
        }
    })
})


router.post('/login', async (req, res) => {
    // #swagger.tags = ['clients']
    // #swagger.summary = 'Login the client'
    const {email, password} = req.body;

    // email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send("Invalid email format.");
        console.log("nop")
    }

    try {
        // Récupérer les informations de l'utilisateur depuis la base de données en fonction de l'adresse e-mail
        const [user] = await connection.promise().query("SELECT * FROM tb_clients_accept natural join tb_clients natural join tb_Login WHERE Mail_Address = ?", [email]);

        // Vérifier si l'utilisateur existe
        if (user.length === 0) {
            return res.status(401).json({error: 'Invalid email or password'});
        }
        if (user[0]["Accept"] != 1) {
            if (user[0]["Accept"] == 0) {
                //user not validate by admin
                return res.status(203).json({error: 'Admin has not validate your account yet'});
            } else if (user[0]["Accept"] == 2) {
                //user redused by admin
                return res.status(203).json({error: 'Admin has refused your account'});
            }
        } else {
            //  vérifier si l'utilissateur est un admin
            const isAdmin = user[0].admin;

            // comparé le mot de passe fourni avec le mot de passe haché stocké en base de données
            const isMatch = await bcrypt.compare(password, user[0].Password);


            // recevoir le client ID pour le mettre dans le token
            let clientID = undefined;
            const sql = "SELECT ID_Client FROM tb_clients WHERE Mail_Address = ?";
            const result = await new Promise((resolve, reject) => {
                connection.query(sql, [email], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            clientID = result[0].ID_Client;


            // Si les mots de passe correspondent, créer un token JWT et le renvoyer au client
            if (isMatch) {
                const auth_token = jwt.sign({
                    'email': email,
                    'clientID': clientID
                }, process.env.JWTaccessTokenSecret, {expiresIn: '1h'});
                const refresh_auth_token = jwt.sign({
                    'email': email,
                    'clientID': clientID
                }, process.env.JWTrefreshTokenSecret, {expiresIn: '1D'});

                return res.json({auth_token, refresh_auth_token, isAdmin});
            } else {
                // Si les mots de passe ne correspondent pas, renvoyer une réponse d'erreur
                return res.status(401).json({error: 'Invalid email or password'});
            }
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});


    router.post("/new", (req, res) => {
        // #swagger.tags = ['clients']
        // #swagger.summary = 'Créate a client in the DB'
        // Supposons que vous receviez les données nécessaires dans le corps de la requête
        const {companyName, country, address, email, phone, password} = req.body;

        // email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).send("Invalid email format.");
            console.log("nop")
        }

        let sql = "INSERT INTO tb_clients (Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number) VALUES (?, ?, ?, ?, ?)";
        let values = [companyName, email, address, country, phone];

        //insersion client infos
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

                //insersion tableau acceptation par admin
                connection.query(acceptSql, acceptValues, function (acceptErr, acceptResult) {
                    if (acceptErr) {
                        console.error("Erreur lors de l'insertion dans la table 'tb_clients_accept' : ", acceptErr);
                        res.status(500).send("Erreur lors de l'insertion dans la table 'tb_clients_accept'.");
                    } else {
                        console.log("Nouveau client ajouté avec succès !");

                        // Insérer le password pour le client dans la table 'tb_Login'
                        let passwordSql = "INSERT INTO tb_Login (ID_Client, Password) VALUES (?, ?)";
                        let passwordValues = [clientId, password];

                        // insersion du password hasé
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
                                        console.log(`Le client ${companyName} à été ajouter à la DB avec succes !`);
                                        // envoyer le mail
                                        // @ts-ignore
                                        sendEmail(email);

                                        //validation final
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


router.post("/addClient", (req, res) => {
    // #swagger.tags = ['clients']
    // #swagger.summary = 'Add client from the admin page so he is already accepted'
    // Supposons que vous receviez les données nécessaires dans le corps de la requête
    const {companyName, country, address, email, phone, password} = req.body;

    let sql = "INSERT INTO tb_clients (Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number) VALUES (?, ?, ?, ?, ?)";
    let values = [companyName, email, address, country, phone];

    //insersion client infos
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

            //insersion tableau acceptation par admin
            connection.query(acceptSql, acceptValues, function (acceptErr, acceptResult) {
                if (acceptErr) {
                    console.error("Erreur lors de l'insertion dans la table 'tb_clients_accept' : ", acceptErr);
                    res.status(500).send("Erreur lors de l'insertion dans la table 'tb_clients_accept'.");
                } else {
                    console.log("Nouveau client ajouté avec succès !");

                    // Insérer le password pour le client dans la table 'tb_Login'
                    let passwordSql = "INSERT INTO tb_Login (ID_Client, Password) VALUES (?, ?)";
                    let passwordValues = [clientId, password];

                    //insersion du password hasé
                    connection.query(passwordSql, passwordValues, function (acceptErr, acceptResult) {
                        if (acceptErr) {
                            console.error("Erreur lors de l'insertion dans la table 'tb_Login' : ", acceptErr);
                            res.status(500).send("Erreur lors de l'insertion dans la table 'tb_Login'.");
                        } else {
                            console.log("Password ajouté avec succès !");

                            let shoppingCartsql = "INSERT INTO tb_cart_client_link (ID_Shopping_Cart, ID_Client) VALUES (?, ?)"
                            let shoppingCartValues = [clientId, clientId]

                            // insertion du shopping cart
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


router.put("/update", authenticateJWT, (req, res) => {
    // #swagger.tags = ['clients']
    // #swagger.summary = 'Update a client informations'
    // Get the client ID to update from the request parameters
    const clientId = req.params.id;

    // Get the new information of the client from the request body
    const {Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number} = req.body;

    // create the SQL query to update the client information in the database
    const sql = "UPDATE tb_clients SET Society_Name = ?, Mail_Address = ?, Addresse = ?, ID_Country = ?, Phone_Number = ? WHERE ID_Client = ?";

    // Execute the SQL query with the new information of the client and its ID
    connection.query(sql, [Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number, clientId], (err, result) => {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving data from the database: ", err);
            res.status(500).json({error: "Error retrieving data from the database"});
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données
            res.send("Update avec succès");
        }
    });
});


module.exports = router;