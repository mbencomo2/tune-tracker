const express = require("express");
const router = express();
const users = require("./user");
const albums = require("./album");
const tracks = require("./track");

router.get("/", (req, res) => {
  res.send("If you can see this you are in the API route.");
});

router.use("/user", users);
router.use("/album", albums);
router.use("/track", tracks);

module.exports = router;
