const express = require("express");
const router = express();
const apiRoutes = require("./api");
const swagger = require("swagger-ui-express");
const swaggerDoc = require("../swagger/swagger-output.json");

router.use("/api", apiRoutes);
router.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc));
router.use("/", (req, res) => {
  res.send("Use api/api-docs/ for how to use this service.");
});

module.exports = router;
