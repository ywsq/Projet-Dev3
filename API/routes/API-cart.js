const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());

router.get("/all-carts", (req, res) => {
    let sql = "select * from tb_shopping_cart_article";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

// GET the user's shopping cart content
router.get("/cart", (req, res) => {

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const clientID =jwt.decode(token).clientID



    let sql = "SELECT * FROM tb_shopping_cart_article NATURAL JOIN tb_articles WHERE ID_Shopping_Cart LIKE " + clientID;
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


router.put("/update-cart-article/:cartId/:articleId", (req, res) => {
    // Récupérer les données nécessaires de la requête
    const { cartId, articleId } = req.params;
    const { newAmount } = req.body;

    // Vérifier que newAmount est un nombre valide
    if (isNaN(newAmount) || newAmount <= 0) {
        return res.status(400).json({ error: "Invalid new amount provided" });
    }

    // Construction de la requête SQL pour mettre à jour le montant de l'article dans le panier
    let sql = "UPDATE tb_shopping_cart_article SET Amount = ? WHERE ID_Shopping_Cart = ? AND ID_article = ?";
    let values = [newAmount, cartId, articleId];

    // Exécuter la requête SQL
    connection.query(sql, values, function (err, result) {
        if (err) {
            // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
            console.error("Error updating cart article:", err);
            res.status(500).json({ error: "Error updating cart article in the database" });
        } else {
            // Vérifier si la mise à jour a affecté des lignes
            if (result.affectedRows > 0) {
                // Récupérer le contenu mis à jour du panier d'achat
                let selectSql = "SELECT * FROM tb_shopping_cart_article NATURAL JOIN tb_articles WHERE ID_Shopping_Cart LIKE ?";
                connection.query(selectSql, cartId, function (selectErr, selectResult) {
                    if (selectErr) {
                        console.error("Error retrieving updated shopping cart content:", selectErr);
                        res.status(500).json({ error: "Error retrieving updated shopping cart content from the database" });
                    } else {
                        // Si la requête s'est exécutée avec succès, renvoyer les données mises à jour du panier d'achat
                        res.status(200).json(selectResult);
                    }
                });
            } else {
                // Si aucune ligne n'a été affectée, cela signifie qu'aucun article avec cet ID dans ce panier n'a été trouvé
                res.status(404).json({ error: "Cart article not found" });
            }
        }
    });
});

router.delete("/cart/:articleId/:cartId", (req, res) => {
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


router.post("/add-to-cart", (req, res) => {
    // Supposons que vous receviez les données nécessaires dans le corps de la requête
    const { ID_Shopping_Cart, ID_Article, Amount } = req.body;

    // Assurez-vous d'effectuer une validation des données avant l'insertion

    let sql = "INSERT INTO tb_shopping_cart_article (ID_Shopping_Cart, ID_Article, Amount) VALUES (?, ?, ?)";
    let values = [ID_Shopping_Cart, ID_Article, Amount];

    connection.query(sql, values, function (err, result) {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données : ", err);
            res.status(500).send("Erreur lors de l'insertion dans la base de données.");
        } else {
            console.log("Nouvel article ajouté au panier !");
            res.status(200).send("Nouvel article ajouté au panier !");
        }
    });
});



// Endpoint pour la suppression d'un objet par ID
router.delete('/cart/:id', (req, res) => {
    const id = req.params.id; // Récupérer l'ID de la requête

    // Supprimer l'objet de la table en utilisant l'ID fourni
    // Code de suppression de la base de données (à remplacer par le vôtre)
    // Exemple de suppression fictive
    // database.deleteObjectById(id, (err, result) => {
    //     if (err) {
    //         res.status(500).send('Erreur lors de la suppression de l\'objet');
    //     } else {
    //         res.status(200).send('Objet supprimé avec succès');
    //     }
    // });

    // Réponse de succès (à supprimer ou à commenter une fois que vous avez intégré la suppression dans votre base de données)
    res.status(200).send(`Objet avec l'ID ${id} supprimé avec succès`);
});

router.post("/replace-in-cart", (req, res) => {
    // Supposons que vous receviez les données nécessaires dans le corps de la requête
    const { ID_Shopping_Cart, ID_Old_Article, ID_New_Article, New_Amount } = req.body;

    // Assurez-vous d'effectuer une validation des données avant la mise à jour

    // Suppression de l'article existant
    let deleteSql = "DELETE FROM tb_shopping_cart_article WHERE ID_Shopping_Cart = ? AND ID_Article = ?";
    let deleteValues = [ID_Shopping_Cart, ID_Old_Article];

    connection.query(deleteSql, deleteValues, function (deleteErr, deleteResult) {
        if (deleteErr) {
            console.error("Erreur lors de la suppression de l'article du panier : ", deleteErr);
            res.status(500).send("Erreur lors de la suppression de l'article du panier.");
        } else {
            // Insertion du nouvel article
            let insertSql = "INSERT INTO tb_shopping_cart_article (ID_Shopping_Cart, ID_Article, Amount) VALUES (?, ?, ?)";
            let insertValues = [ID_Shopping_Cart, ID_New_Article, New_Amount];

            connection.query(insertSql, insertValues, function (insertErr, insertResult) {
                if (insertErr) {
                    console.error("Erreur lors de l'insertion du nouvel article dans le panier : ", insertErr);
                    res.status(500).send("Erreur lors de l'insertion du nouvel article dans le panier.");
                } else {
                    console.log("Article remplacé dans le panier avec succès !");
                    res.status(200).send("Article remplacé dans le panier avec succès !");
                }
            });
        }
    });
});


// Proceed to checkout and create an order from the shopping cart
router.post("/cart/checkout", (req) => {
    // Retrieve the user's shopping cart content from the session
    const cartContent = req.session.cart;

    // Insert the cart items into the database
    const orderItems = cartContent.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));

    // Calculate the total amount of the order
    const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Insert the order into the database
    const newOrder = {
        userId: req.user.id, // Assuming you have authentication and user ID available in req.user
        items: orderItems,
        totalAmount: totalAmount,
        status: "pending" // Assuming you have a status field for orders
    };

    // Save the new order in the database
    db.tb_orders.insert(newOrder, (result) => {

        // Clear the user's shopping cart (remove cart content from the session)
        delete req.session.cart;
    });
});

module.exports = router;
