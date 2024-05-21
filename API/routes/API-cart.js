const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());


router.put("/update/:cartId/:articleId", (req, res) => {
    // #swagger.tags = ['carts']
    // #swagger.summary = 'Update the amount of article in the cart from a client'

    // récupérer les données de la requête
    const {cartId, articleId} = req.params;
    const {newAmount} = req.body;

    // Vérifier que newAmount est un nombre valide
    if (isNaN(newAmount) || newAmount <= 0) {
        return res.status(400).json({error: "Invalid new amount provided"});
    }

    // Construction de la requête SQL pour mettre à jour le montant de l'article dans le panier
    let sql = "UPDATE tb_shopping_cart_article SET Amount = ? WHERE ID_Shopping_Cart = ? AND ID_article = ?";
    let values = [newAmount, cartId, articleId];

    connection.query(sql, values, function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error updating cart article:", err);
            res.status(500).json({error: "Error updating cart article in the database"});
        } else {
            // Vérifier si la mise à jour a affecté des lignes
            if (result.affectedRows > 0) {
                // Récupérer le contenu mis à jour du panier d'achat
                let selectSql = "SELECT * FROM tb_shopping_cart_article NATURAL JOIN tb_articles WHERE ID_Shopping_Cart LIKE ?";
                connection.query(selectSql, cartId, function (selectErr, selectResult) {
                    if (selectErr) {
                        console.error("Error retrieving updated shopping cart content:", selectErr);
                        res.status(500).json({error: "Error retrieving updated shopping cart content from the database"});
                    } else {
                        // si la requête s'est exécutée avec succès, renvoyer les données mises à jour du panier d'achat
                        res.status(200).json(selectResult);
                    }
                });
            } else {
                // Si aucune ligne n'a été affectée, cela signifie qu'aucun article avec cet ID dans ce panier n'a été trouvé
                res.status(404).json({error: "Cart article not found"});
            }
        }
    });
});

router.delete("/delete/:articleId/:cartId", (req, res) => {
    // #swagger.tags = ['carts']
    // #swagger.summary = 'Delete a article in the cart from a client'
    let sql = "DELETE FROM tb_shopping_cart_article WHERE ID_Article = ? AND ID_Shopping_Cart = ?";
    connection.query(sql, [req.params.articleId, req.params.cartId], function (err, result) {
        if (err) {
            console.error("Erreur lors de la suppression de l'article du panier:", err);
            res.status(500).send("Erreur lors de la suppression de l'article du panier");
        } else {
            console.log("Article du panier supprimé avec succès");
            res.send("Article du panier supprimé avec succès");
        }
    });
});

router.delete("/delete-all/:cartId", (req, res) => {
    // #swagger.tags = ['carts']
    // #swagger.summary = 'Delete all article in the cart from a client'
    let sql = "DELETE FROM tb_shopping_cart_article WHERE  ID_Shopping_Cart = ?";
    connection.query(sql, [req.params.cartId], function (err, result) {
        if (err) {
            console.error("Erreur lors de la suppression de l'article du panier:", err);
            res.status(500).send("Erreur lors de la suppression de l'article du panier");
        } else {
            console.log("Article du panier supprimé avec succès");
            res.send("Article du panier supprimé avec succès");
        }
    });
});

router.post("/add", (req, res) => {
    // #swagger.tags = ['carts']
    // #swagger.summary = 'Add a article in the cart from a client'

    const {ID_Article, Amount} = req.body;

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID

    let sqlFindCartId = "select ID_Shopping_Cart from tb_cart_client_link where ID_Client = " + clientID

    connection.query(sqlFindCartId, function (err, result) {
        if (err) {
            console.error("Erreur lors de la recherche du cart du client : ", err);
            res.status(400).send("Erreur lors de l'insertion dans la base de données.");
        } else {
            let ID_Shopping_Cart = result[0]["ID_Shopping_Cart"]


            let sql = "INSERT INTO tb_shopping_cart_article (ID_Shopping_Cart, ID_Article, Amount) VALUES (?, ?, ?)";
            let values = [ID_Shopping_Cart, ID_Article, Amount];

            connection.query(sql, values, function (err, result) {
                if (err) {
                    res.status(409).send("Erreur lors de l'insertion dans la base de données.");
                } else {
                    console.log("Nouvel article ajouté au panier !");
                    res.status(200).send("Nouvel article ajouté au panier !");
                }
            });
        }
    });
});


router.get("/", (req, res) => {
    // #swagger.tags = ['carts']
    // #swagger.summary = 'Return cart from the client'
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID



    let sql = "SELECT * FROM tb_shopping_cart_article NATURAL JOIN tb_articles WHERE ID_Shopping_Cart LIKE " + clientID;
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

router.get("/ID", (req, res) => {
    // #swagger.tags = ['carts']
    // #swagger.summary = 'Return cart from a client base on his ID'

    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];
    const clientID = jwt.decode(token).clientID


    let sql = "SELECT * FROM tb_shopping_cart_article NATURAL JOIN tb_articles WHERE ID_Shopping_Cart LIKE " + clientID;
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

router.get("/admin/:id", (req, res) => {
    // #swagger.tags = ['carts']
    // #swagger.summary = 'Return cart from a client base on his ID'
    const clientID = req.params.id;
    let sql = "SELECT * FROM tb_shopping_cart_article NATURAL JOIN tb_articles WHERE ID_Shopping_Cart LIKE " + clientID;
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


module.exports = router;
