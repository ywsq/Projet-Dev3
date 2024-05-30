const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const authenticateJWT = require("../middlewares/authenticateJWT");


router.get("/all-categories", (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.summary = 'Return all categories from the articles'
    let sql = "select Category_Name from tb_category";
    connection.query(sql, function (err, result, fields) {
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



router.get("/all-infos/:id", (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.summary = 'Return all infos of an artile base on his id'
    let sql = "select * from tb_articles join tb_category ON tb_articles.ID_Category = tb_category.ID_Category join tb_brands ON tb_articles.ID_Brand = tb_brands.ID_Brand join tb_image_article ON tb_articles.ID_Article = tb_image_article.ID_Article where tb_articles.ID_Article like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        if (result.length == 0) {
            let fallbackSql = "select * \n" +
                "from tb_articles\n" +
                "join tb_category\n" +
                "ON tb_articles.ID_Category = tb_category.ID_Category \n" +
                "join tb_brands\n" +
                "ON tb_articles.ID_Brand = tb_brands.ID_Brand \n" +
                "where tb_articles.ID_Article like " + req.params.id;

            connection.query(fallbackSql, function (fallbackErr, fallbackResult, fallbackFields) {
                if (fallbackErr) {
                    console.error("Fallback query failed:", fallbackErr);
                    // Handle fallback query failure appropriately
                    res.status(500).send("Error fetching data");
                } else {
                    // Send the result of the fallback query
                    res.send(fallbackResult);
                }
            });
        } else {
            // Send the result if the query was successful
            if (err) {
                // En cas d'erreur de base de données, renvoyer une réponse avec un code d'erreur approprié
                console.error("Error retrieving data from the database: ", err);
                res.status(500).json({error: "Error retrieving data from the database"});
            } else {
                // Si la requête s'est exécutée avec succès, renvoyer les données du client administrateur
                res.status(200).json(result);
            }
        }
    });
});


router.get("/all", (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.summary = 'Return all articles'
    let sql = "select tb_articles.ID_Category, tb_articles.ID_Article, tb_articles.Name, tb_articles.Small_Description, tb_articles.Description, tb_articles.Stock, tb_articles.Single_Price, tb_articles.Min_To_By, tb_articles.On_Market, tb_category.Category_Name, tb_image_article.Image, tb_image_article.Order from tb_articles natural join tb_category left outer join tb_image_article ON tb_articles.ID_Article = tb_image_article.ID_Article;";
    connection.query(sql, function (err, result, fields) {
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

router.get("/articlesDetails", (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.summary = 'Return all articles with more details'
    let sql = "select * from tb_articles join tb_category ON tb_articles.ID_Category = tb_category.ID_Category join tb_brands ON tb_articles.ID_Brand = tb_brands.ID_Brand join tb_image_article ON tb_articles.ID_Article = tb_image_article.ID_Article";
    connection.query(sql, function (err, result, fields) {
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

router.get("/Category/:name", (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.summary = 'Return all article from a dedicate category'
    let sql = "select * from tb_category natural join tb_articles where Category_Name like '" + req.params.name + "'";
    connection.query(sql, function (err, result, fields) {
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


router.get("/:id", (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.summary = 'Return an article base on his ID'
    let sql = "select * from tb_articles where id_article like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
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

router.put("/editingArticle/:id", authenticateJWT,(req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.summary = 'Edit a article base on his ID'
    const id = req.params.id;
    const {Image, Name, Stock, Single_Price} = req.body;

    // Construire la requête SQL pour mettre à jour l'article avec les nouvelles données
    const sql = `UPDATE tb_articles SET Image = ?, Name = ?, Stock = ?, Single_Price = ? WHERE ID_Article = ?`;

    // Exécuter la requête SQL avec les valeurs mises à jour
    connection.query(sql, [Image, Name, Stock, Single_Price, id], function (err, result, fields) {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'article:', err);
            res.status(500).send('Erreur lors de la mise à jour de l\'article');
        } else {
            // Envoyer une réponse de succès si la mise à jour a réussi
            res.status(200).send('Article mis à jour avec succès');
        }
    });
});


module.exports = router
