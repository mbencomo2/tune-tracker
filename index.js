const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const port = process.env.PORT || 3000;

app.use("/", routes);

// establish a connection to the mongo database
try {
  mongoose.connect(process.env.DB_URI);
  app.listen(port);
  console.log(`Connected to database and listening at http://localhost:${port}/`);
} catch (err) {
  console.log("Connection failed: " + err);
}
