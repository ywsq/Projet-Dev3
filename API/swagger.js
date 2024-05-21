const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Star Mobile API",
        description: "This API is used by the Star Mobile site",
        version: "1.0.0"
    },
    host: "54.37.12.177:8080",
    basePath: "54.37.12.177:8080/",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// generate swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated');
});
