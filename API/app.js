const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJson = require("./swagger-output.json");
const swaggerDoc = require("./swagger");
const DataBaseConnection = require('./DataBaseConnection/connection.js');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const authenticateJWT = require('./middlewares/authenticateJWT');

// swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// connect all route
const routerIndex = require("./routes/index.js")
const clientAPI = require("./routes/API-client.tsx")
const articleAPI = require("./routes/API-article.js")
const pannierAPI = require("./routes/API-pannier.js")
const orderAPI = require("./routes/API-order.js")
const searchAPI = require("./routes/API-search.js")
const cartAPI = require("./routes/API-cart.js")
const accountAPI = require("./routes/API-account.js")
//const refreshToken = require("./middlewares/refreshToken");


app.use('/', routerIndex);
app.use('/API', clientAPI);
app.use('/API', articleAPI);
app.use('/API', orderAPI);
app.use('/API', searchAPI);
app.use('/API', cartAPI);
app.use('/API', accountAPI);


// start your Express app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







