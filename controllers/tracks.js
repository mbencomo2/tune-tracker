const Track = require("../model/track");
const ObjectId = require("mongodb").ObjectId;

const getTracks = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const id = new ObjectId(req.params.userId);
    const result = await Track.find({ user: id });
    if (result) {
      res.status(202).json({ message: "Fetched all Tracks", data: result });
    } else {
      res.status(202).json({ message: "No Tracks for current user", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const getTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const id = new ObjectId(req.params.id);
    const result = await Track.findOne({ _id: id });
    if (result) {
      res.status(202).json({ message: "Fetched Track details", data: result });
    } else {
      res.status(202).json({ message: "No Track found", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const createTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    if (req._body) {
      const track = new Track({
        title: req.body.title || "",
        artist: req.body.artist || "",
        album: req.body.album || "",
        albumArtist: req.body.artist || "",
        coverArt: req.body.coverArt || "",
        trackLength: req.body.trackLength || "",
        trackNumber: req.body.trackNumber || "",
        genre: req.body.genre || "",
        user: req.body.user
      });
      const result = await track.save();
      if (result) {
        res.status(201).json({ message: "New Track created", Track: result });
      }
    } else {
      res.status(400).json({ message: "Request body cannot be empty" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server Error", error: err });
  }
};

const updateTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const id = new ObjectId(req.params.id);
    const track = await Track.findOne({ _id: id });
    if (track) {
      track.title = req.body.title || track.title;
      track.artist = req.body.artist || track.artist;
      track.album = req.body.album || track.album;
      track.albumArtist = req.body.artist || track.albumArtist;
      track.coverArt = req.body.coverArt || track.coverArt;
      track.trackLength = req.body.trackLength || track.trackLength;
      track.trackNumber = req.body.trackNumber || track.trackNumber;
      track.genre = req.body.genre || track.genre;
      const result = await track.save();
      if (result) {
        res.status(202).json({ message: "Updated Track details", track: result });
      } else {
        res.status(404).json({ message: "Error saving Track details" });
      }
    } else {
      res.status(202).json({ message: "No Track found", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const deleteTrack = async (req, res) => {
  // #swagger.tags = ['Tracks']
  try {
    const id = new ObjectId(req.params.id);
    const result = await Track.deleteOne({ _id: id });
    if (result) {
      if (result) {
        res.status(202).json({ message: "Deleted Track" });
      } else {
        res.status(404).json({ message: "Error deleting Track" });
      }
    } else {
      res.status(202).json({ message: "No Track found", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

module.exports = { getTrack, getTracks, createTrack, updateTrack, deleteTrack };
