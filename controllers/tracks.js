const Track = require("../model/track");
const ObjectId = require("mongodb").ObjectId;

/**
 * Get all tracks saved by the current user
 */
const getTracksbyUser = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const id = req.oidc.user.sub;
    const result = await Track.find({ userID: id.split("|")[1] });
    if (result) {
      const data = result.map((track) => {
        const trackData = track.toObject();
        delete trackData.userID;
        return trackData;
      });
      res.status(202).json({ message: "Fetched all Tracks", tracks: data });
    } else {
      res.status(422).json({ message: "No Tracks found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

/**
 * Get a specific track
 */
const getTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const result = await Track.findById(req.params.trackId);
    if (result) {
      const data = result.toObject();
      delete data.userID;
      res.status(202).json({ message: "Fetched Track details", track: data });
    } else {
      res.status(422).json({ message: "No Track found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

/**
 * Get all tracks from a certain album
 */
const getTracksbyAlbum = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const result = await Track.find({ albumID: req.params.albumId });
    if (result) {
      const data = result.map((track) => {
        const trackData = track.toObject();
        delete trackData.userID;
        return trackData;
      });
      res.status(202).json({ message: "Fetched Track deteails", tracks: data });
    } else {
      res.status(422).json({ message: "No tracks fround" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
};

/**
 * Create a new track
 */
const createTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  if (!req._body) {
    res.status(422).json({ message: "Request body cannot be empty" });
  } else {
    try {
      const id = req.oidc.user.sub;
      const track = new Track({
        title: req.body.title || "",
        artist: req.body.artist || "",
        albumID: req.body.albumID || "",
        albumArtist: req.body.artist || "",
        coverArt: req.body.coverArt || "",
        trackLength: req.body.trackLength || "",
        trackNumber: req.body.trackNumber || "",
        genre: req.body.genre || "",
        userID: id.split("|")[1]
      });
      const result = await track.save();
      if (result) {
        const data = result.toObject();
        delete data.userID;
        res.status(201).json({ message: "New Track created", track: data });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error", error: err });
    }
  }
};

/**
 * Update a certain track's info
 */
const updateTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  if (!req._body) {
    res.status(422).json({ error: { message: "Request body cannot be empty" } });
  } else {
    try {
      const id = new ObjectId(req.params.trackId);
      const track = await Track.findOne({ _id: id });
      if (track) {
        track.title = req.body.title || track.title;
        track.artist = req.body.artist || track.artist;
        track.albumID = req.body.albumID || track.albumID;
        track.albumArtist = req.body.albumArtist || track.albumArtist;
        track.coverArt = req.body.coverArt || track.coverArt;
        track.trackLength = req.body.trackLength || track.trackLength;
        track.trackNumber = req.body.trackNumber || track.trackNumber;
        track.genre = req.body.genre || track.genre;
        const result = await track.save();
        if (result) {
          const data = result.toObject();
          delete data.userID;
          res.status(202).json({ message: "Updated Track details", track: data });
        }
      } else {
        res.status(422).json({ message: "No Track found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error", error: err });
    }
  }
};

/**
 * Delete a certain track
 */
const deleteTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const result = await Track.findByIdAndDelete(req.params.trackId);
    if (result) {
      res.status(202).json({ message: "Deleted Track" });
    } else {
      res.status(202).json({ message: "No Track found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  getTrack,
  getTracksbyUser,
  getTracksbyAlbum,
  createTrack,
  updateTrack,
  deleteTrack
};
