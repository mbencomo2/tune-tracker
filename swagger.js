const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const doc = {
  info: {
    title: "Tune Tracker API",
    description: "A simple REST API to keep track of your albums and music tracks"
  },
  security: {
    oauth2: {
      type: "oauth2",
      flows: {
        implicit: {
          authorizationUrl: process.env.ISSUER_URL,
          scopes: {
            read: "Grants read access",
            write: "Grants write access"
          }
        }
      }
    }
  },
  host: "tune-tracker.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
