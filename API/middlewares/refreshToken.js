const jwt = require('jsonwebtoken');

const refreshToken = (req, res, next) => {
    const { token } = req;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'Votre_Clef_Secrète_pour_le_JWT');
        const { exp } = decoded;
        const now = Math.floor(Date.now() / 1000);
        const refreshThreshold = 300; // 5 minutes avant expiration

        if (exp - now < refreshThreshold) {
            const refreshedToken = jwt.sign({ email: decoded.email }, 'Votre_Clef_Secrète_pour_le_JWT', { expiresIn: '1h' });
            req.token = refreshedToken;
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    next();
};

module.exports = refreshToken;
