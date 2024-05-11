const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
    let sql = "SELECT * FROM tb_clients natural join tb_orders;";
    connection.query(sql, function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving shopping cart content:", err);
            res.status(500).json({ error: "Error retrieving shopping cart content from the database" });
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du panier d'achat
            res.status(200).json(result);
        }
    });
});


router.get("/all", (req, res) => {

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID

    //rajouter quand le client est pas connecter un if aussinon la requete sql foire

    let sql = "SELECT * FROM tb_article_order_link natural join tb_orders;";
    connection.query(sql, function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving shopping cart content:", err);
            res.status(500).json({ error: "Error retrieving shopping cart content from the database" });
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du panier d'achat
            res.status(200).json(result);
        }
    });
});


router.post("/add", (req, res) => {
    // Supposons que vous receviez les données nécessaires dans le corps de la requête
    const { Order_Date, Availability_Date, Price } = req.body;

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID;

    let sqlCreateOrder = "INSERT INTO tb_orders (ID_client, Order_Date, Availability_Date, Price) VALUES (?, ?, ?, ?);";

    connection.query(sqlCreateOrder, [clientID, Order_Date, Availability_Date, Price], function (err, result) {
        if (err) {
            console.error("Erreur lors de la création de la commande : ", err);
            res.status(400).send("Erreur lors de l'insertion dans la base de données.");
        } else {
            let sql = "SELECT ID_Orders FROM tb_orders WHERE ID_Client = ?;";
            connection.query(sql, [clientID], function (err, result) {
                if (err) {
                    res.status(409).send("Erreur lors de la recherche de la commande dans la base de données.");
                } else {
                    let orderID = result[0]["ID_Orders"];
                    let sqlCart = "SELECT * FROM tb_shopping_cart_article WHERE ID_Shopping_Cart = ?";
                    connection.query(sqlCart, [clientID], function (err, cartResults) {
                        if (err) {
                            console.error("Erreur lors de la récupération du contenu du panier : ", err);
                            res.status(500).json({ error: "Erreur lors de la récupération du contenu du panier depuis la base de données" });
                        } else {
                            cartResults.forEach(cartItem => {
                                let articleID = cartItem["ID_Article"];
                                let amount = cartItem["Amount"];
                                let sqlInsertArticleOrderLink = "INSERT INTO tb_article_order_link (ID_Orders, ID_Article, Amount) VALUES (?, ?, ?);";
                                connection.query(sqlInsertArticleOrderLink, [orderID, articleID, amount], function (err, insertResult) {
                                    if (err) {
                                        console.error("Erreur lors de l'insertion de l'article dans le lien de commande : ", err);
                                    }
                                });
                            });
                            // Répondre une fois que toutes les insertions sont terminées
                            res.status(200).send("Commande créée avec succès !");
                        }
                    });
                }
            });
        }
    });
});


module.exports = router;