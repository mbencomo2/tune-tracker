const express = require("express");
const router = express();
const userController = require("../controllers/users");
const { userValidationRules, validate } = require("../validator.js");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Content-Type", "application/json");
  console.log("Time: ", Date.now(), { route: "Users" });
  next();
});

router.get("/", userController.getUser);
router.post("/", userValidationRules(), validate, userController.createUser);
// router.post("/login", userValidationRules(), validate, userController.login);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
