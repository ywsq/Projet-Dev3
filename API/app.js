const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJson = require("./swagger-output.json")
const swaggerDoc = require("./swagger");
const DataBaseConnection = require('./DataBaseConnection/connection.js')
const app = express();
const port = 8080;


// swagger documentation



// connect all route
const routerIndex = require("./routes/index.js")
const routerAPI = require("./routes/API-client.js")
app.use('/', routerIndex)
app.use('/API/client', routerAPI)


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

// start your Express app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







