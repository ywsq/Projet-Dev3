const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "E-Organizer API",
        description: "API defined for a sample project during the course 'Développement Informatique III' à l'EPHEC Louvain-la-Neuve",
        version: "1.0.0" // Define a valid version field
    },
    host: "localhost:8080",
    basePath: "/", // Base path of your API
    schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// Generate Swagger documentation
swaggerAutogen(outputFile, endpointsFiles, doc);
