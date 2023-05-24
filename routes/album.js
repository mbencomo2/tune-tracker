const express = require("express");
const router = express();
const albumsController = require("../controllers/albums");
const authenticateUser = require("../authenticate");

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

router.get("/user", authenticateUser, albumsController.getAlbums);
router.get("/:albumId", authenticateUser, albumsController.getAlbum);
router.post("/", authenticateUser, albumsController.createAlbum);
router.put("/:albumId", authenticateUser, albumsController.updateAlbum);
router.delete("/:albumId", authenticateUser, albumsController.deleteAlbum);

module.exports = router;
