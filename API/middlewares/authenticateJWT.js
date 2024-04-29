const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const accessTokenSecret = 'Votre_Clef_Secrète_pour_le_JWT';
const refreshTokenSecret = 'Votre_Autre_Clef_Secrète_pour_le_Rafraîchissement';
const refreshTokens = []; // Stockez les tokens de rafraîchissement dans une base de données ou un stockage persistant

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, async (err, user) => {
            if (err) {
                const refreshToken = req.headers["refresh_auth_token"].split(' ')[1];
                if (refreshToken) {
                    jwt.verify(refreshToken, refreshTokenSecret, async (err, user) => {
                        if (err) {
                            return res.sendStatus(403);
                        }

                        email = jwt.decode(token).email

                        const newAccessToken = jwt.sign({ email }, accessTokenSecret, { expiresIn: '30s' });
                        const newRefreshToken = jwt.sign({ email }, refreshTokenSecret, { expiresIn: '1D' });

                        // Replace the old refresh token with a new one and send it back
                        const refreshTokenIndex = refreshTokens.indexOf(refreshToken);
                        refreshTokens[refreshTokenIndex] = newRefreshToken;

                        // Set the new tokens in response headers
                        res.setHeader("auth_token", newAccessToken);
                        res.setHeader("refresh_auth_token", newRefreshToken);

                        // Send back the response with updated headers
                        // Call next() after sending the response to continue to the next middleware or route handler
                        next();
                    });
                } else {
                    return res.sendStatus(403);
                }
            } else {
                // Stockez les informations de l'utilisateur dans la requête
                req.body.user = user;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
