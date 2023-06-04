const express = require("express");
const router = express();
const albumsController = require("../controllers/albums");
const { validate, albumValidationRules } = require("../validator");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Content-Type", "application/json");
  console.log("Time: ", Date.now(), { route: "Albums" });
  next();
});

router.get("/user", albumsController.getAlbums);
router.get("/:albumId", albumsController.getAlbum);
router.post("/", albumValidationRules(), validate, albumsController.createAlbum);
router.put("/:albumId", albumsController.updateAlbum);
router.delete("/:albumId", albumsController.deleteAlbum);

module.exports = router;
