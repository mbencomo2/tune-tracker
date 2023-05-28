const express = require("express");
const router = express();
const tracksController = require("../controllers/tracks");
const authenticateUser = require("../authenticate");
const {validate, trackValidationRules} = require("../validator");

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

router.get("/user", authenticateUser, tracksController.getTracksbyUser);
router.get("/:trackId", authenticateUser, tracksController.getTrack);
router.get("/album/:albumId", authenticateUser, tracksController.getTracksbyAlbum);
router.post("/",trackValidationRules(), validate, authenticateUser, tracksController.createTrack);
router.put("/:trackId",trackValidationRules(), validate, authenticateUser, tracksController.updateTrack);
router.delete("/:trackId", authenticateUser, tracksController.deleteTrack);

module.exports = router;
