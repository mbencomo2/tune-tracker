const express = require("express");
const router = express();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/", (req, res) => {
  res.send("If you can see this then everything is working correctly.");
});

module.exports = router;