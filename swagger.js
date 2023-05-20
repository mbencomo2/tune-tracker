const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tune Tracker API",
    description: "Keep track of your music albums and singles with a simple, easy to use REST API."
  },
  host: "localhost:8080",
  schemes: ["http"]
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
