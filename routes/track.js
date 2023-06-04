const express = require("express");
const router = express();
const tracksController = require("../controllers/tracks");
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

router.get("/user", tracksController.getTracksbyUser);
router.get("/:trackId", tracksController.getTrack);
router.get("/album/:albumId", tracksController.getTracksbyAlbum);
router.post("/",trackValidationRules(), validate, tracksController.createTrack);
router.put("/:trackId",trackValidationRules(), validate, tracksController.updateTrack);
router.delete("/:trackId", tracksController.deleteTrack);

module.exports = router;
