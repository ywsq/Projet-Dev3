const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../DataBaseConnection/connection'); // Importez votre module de connexion à la base de données

const accessTokenSecret = 'Votre_Clef_Secrète_pour_le_JWT';
const refreshTokenSecret = 'Votre_Autre_Clef_Secrète_pour_le_Rafraîchissement';
const refreshTokens = []; // Stockez les tokens de rafraîchissement dans une base de données ou un stockage persistant

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, async (err, decoded) => {
            if (err) {
                const refreshToken = req.body.refreshToken;
                if (refreshToken && refreshTokens.includes(refreshToken)) {
                    jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
                        if (err) {
                            return res.sendStatus(403);
                        }

                        // Récupérez les informations de l'utilisateur depuis la base de données
                        try {
                            const [user] = await connection.promise().query("SELECT * FROM tb_clients WHERE id = ?", [decoded.id]);
                            if (user.length === 0) {
                                return res.status(401).json({ error: 'Invalid token' });
                            }

                            // Stockez les informations de l'utilisateur dans la requête
                            req.body.user = user[0];
                            next();
                        } catch (error) {
                            console.error("Error fetching user information:", error);
                            return res.status(500).json({ message: "Internal Server Error" });
                        }
                    });
                } else {
                    return res.sendStatus(403);
                }
            } else {
                // Stockez les informations de l'utilisateur dans la requête
                req.body.user = decoded;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
