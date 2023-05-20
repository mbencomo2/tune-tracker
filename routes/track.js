const express = require("express");
const router = express();
const tracksController = require("../controllers/tracks");

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

router.get("/", (req, res) => {
  res.json({message: "If you can see this you are in the TRACKS route."});
});

router.get("/user/:userId", tracksController.getTracks);
router.get("/:id", tracksController.getTrack);
router.post("/", tracksController.createTrack);
router.put("/:id", tracksController.updateTrack);
router.delete("/:id", tracksController.deleteTrack);

module.exports = router;
