const express = require("express");
const router = express();
const users = require("./user");
const albums = require("./album");
const tracks = require("./track");

router.use("/user", users);
router.use("/album", albums);
router.use("/track", tracks);

module.exports = router;
