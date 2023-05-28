const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tune Tracker API",
    description: "A simple REST API to keep track of your albums and music tracks"
  },
  host: "tune-tracker.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
