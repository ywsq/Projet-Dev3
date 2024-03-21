const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJson = require("./swagger-output.json")
const swaggerDoc = require("./swagger");
const DataBaseConnection = require('./DataBaseConnection/connection.js')
const app = express();
const port = 8080;


// swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));


// connect all route
const routerIndex = require("./routes/index.js")
const clientAPI = require("./routes/API-client.js")
const articleAPI = require("./routes/API-article.js")
const pannierAPI = require("./routes/API-pannier.js")
app.use('/', routerIndex)
app.use('/API/client', clientAPI)
app.use('/API/article', articleAPI)
app.use('/API/pannier', pannierAPI)


// start your Express app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







