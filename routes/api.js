const express = require("express");
const router = express();
const users = require("./user");

router.get("/", (req, res) => {
  res.send("If you can see this you are in the API route.");
});

router.use("/user", users);



module.exports = router;
