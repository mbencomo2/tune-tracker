const express = require("express");
const router = express();
const albumsController = require("../controllers/albums");

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

router.get("/", (req, res) => {
  res.json({message: "If you can see this you are in the ALBUMS route."});
});

router.get("/user/:userId", albumsController.getAlbums);
router.get("/:id", albumsController.getAlbum);
router.post("/", albumsController.createAlbum);
router.put("/:id", albumsController.updateAlbum);
router.delete("/:id", albumsController.deleteAlbum);

module.exports = router;
