const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJson = require("./swagger-output.json");
const swaggerDoc = require("./swagger");
const DataBaseConnection = require('./DataBaseConnection/connection.js');
const authenticateJWT = require("./middlewares/authenticateJWT");
const app = express();
const port = 8080;


const bodyParser = require('body-parser');

// swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));



// Middleware pour vérifier l'origine des requêtes
const requestOrigin = "https://localhost:3000" // en prod => https://dev3.l2-2.ephec-ti.be/
app.use((req, res, next) => {
    const origin = req.headers.origin || req.headers.referer;
    if (origin && origin.startsWith(requestOrigin)) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: invalid origin' });
    }
});


// body parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
// connect all route
const clientAPI = require("./routes/API-client.tsx")
const articleAPI = require("./routes/API-article.js")
const orderAPI = require("./routes/API-order.js")
const cartAPI = require("./routes/API-cart.js")
const adminManageOrderAPI = require("./routes/API-ADMIN-manage-Order.js")
const adminManageAccountAPI = require("./routes/API-ADMIN-manage-account.tsx")


app.use('/API/client', clientAPI)
app.use('/API/article', articleAPI)
app.use('/API/order', authenticateJWT, orderAPI)
app.use('/API/cart', authenticateJWT, cartAPI)

app.use('/API/admin/manage-orders', authenticateJWT, adminManageOrderAPI) //only admin to have access
app.use('/API/admin/manage-accounts', authenticateJWT, adminManageAccountAPI)

app.use('/', (req, res, next) => {
    res.redirect("/api-docs");
})


// start your Express app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







