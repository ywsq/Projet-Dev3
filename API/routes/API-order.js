const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.summary = 'Return all orders'
    let sql = "SELECT * FROM tb_clients natural join tb_orders;";
    connection.query(sql, function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving shopping cart content:", err);
            res.status(500).json({error: "Error retrieving shopping cart content from the database"});
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du panier d'achat
            res.status(200).json(result);
        }
    });
});


router.get("/all", (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.summary = 'Return all orders'
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID

    //rajouter quand le client est pas connecter un if aussinon la requete sql foire

    let sql = "SELECT * FROM tb_article_order_link natural join tb_orders;";
    connection.query(sql, function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error retrieving shopping cart content:", err);
            res.status(500).json({error: "Error retrieving shopping cart content from the database"});
        } else {
            // Si la requête s'est exécutée avec succès, renvoyer les données du panier d'achat
            res.status(200).json(result);
        }
    });
});


router.post("/add", (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.summary = 'Add a order link to a client and articles in the DB'

    const {Order_Date, Availability_Date, Price} = req.body;
    const status = "In review"

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID;

    let sqlCreateOrder = "INSERT INTO tb_orders (ID_client, Order_Date, Availability_Date, Price, Status) VALUES (?, ?, ?, ?, ?);";

    connection.query(sqlCreateOrder, [clientID, Order_Date, Availability_Date, Price, status], function (err, result) {
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
                            res.status(500).json({error: "Erreur lors de la récupération du contenu du panier depuis la base de données"});
                        } else {
                            cartResults.forEach(cartItem => {
                                let articleID = cartItem["ID_Article"];
                                let amount = cartItem["Amount"];
                                let sqlInsertArticleOrderLink = "INSERT INTO tb_article_order_link (ID_Orders, ID_Article, Amount, Status) VALUES (?, ?, ?);";
                                connection.query(sqlInsertArticleOrderLink, [orderID, articleID, amount], function (err, insertResult) {
                                    if (err) {
                                        console.error("Erreur lors de l'insertion de l'article dans le lien de commande : ", err);
                                    }
                                });
                            });
                            // répondre une fois que toutes les insertions sont terminées
                            res.status(200).send("Commande créée avec succès !");
                        }
                    });
                }
            });
        }
    });
});

router.delete("/delete/:id", (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.summary = 'Delete a order in the DB'
    let ID_Order = req.params.id; // Récupérer l'ID de l'article à supprimer
    console.log(ID_Order)
    let sqlDelLink = "DELETE FROM tb_article_order_link WHERE ID_Orders = ?;";
    connection.query(sqlDelLink, [ID_Order], function (err, result) {
        if (err) {
            console.error("Erreur lors de la suppression de l'article du panier:", err);
            res.status(500).send("Erreur lors de la suppression de l'article du panier");
        } else {
            let sqlDelOrder = "DELETE FROM tb_orders WHERE ID_Orders = ?;";
            connection.query(sqlDelOrder, [ID_Order], function (err, result) {
                if (err) {
                    console.error("Erreur lors de la suppression de l'article du panier:", err);
                    res.status(500).send("Erreur lors de la suppression de l'article du panier");
                } else {
                    console.log("Order supprimé avec succès");
                    res.send("Order supprimé avec succès");
                }
            });
        }
    });
})


module.exports = router;