const express = require("express");
const router = express();
const tracksController = require("../controllers/tracks");
const authenticateUser = require("../authenticate");

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Content-Type", "application/json");
  console.log("Time: ", Date.now(), { route: "Tracks" });
  next();
});

router.get("/user", authenticateUser, tracksController.getTracks);
router.get("/:trackId", authenticateUser, tracksController.getTrack);
router.post("/", authenticateUser, tracksController.createTrack);
router.put("/:trackId", authenticateUser, tracksController.updateTrack);
router.delete("/:trackId", authenticateUser, tracksController.deleteTrack);

module.exports = router;
