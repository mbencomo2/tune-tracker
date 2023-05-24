const express = require("express");
const router = express();
const apiRoutes = require("./api");
const swagger = require("swagger-ui-express");
const swaggerDoc = require("../swagger/swagger-output.json");

router.use("/api", apiRoutes);
router.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc));
router.use("/", (req, res) => {
  res.send("If you can see this then everything is working correctly.");
});

module.exports = router;