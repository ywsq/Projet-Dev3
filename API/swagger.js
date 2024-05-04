const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Star Mobile API",
        description: "This API is use by the Star Mobile site",
        version: "1.0.0" // Define a valid version field
    },
    host: "54.37.12.177:8080",
    basePath: "/", // Base path of your API
    schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);
