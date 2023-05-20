const Album = require("../model/album");
const ObjectId = require("mongodb").ObjectId;

const getAlbums = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    const id = new ObjectId(req.params.userId);
    const result = await Album.find({ user: id });
    if (result) {
      res.status(202).json({ message: "Fetched all albums", albums: result });
    } else {
      res.status(202).json({ message: "No Albums for current user", albums: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const getAlbum = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    const id = new ObjectId(req.params.id);
    const result = await Album.findOne({ _id: id });
    if (result) {
      res.status(202).json({ message: "Fetched album details", data: result });
    } else {
      res.status(202).json({ message: "No album found", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const createAlbum = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    if (req._body) {
      const album = new Album({
        name: req.body.name || "",
        albumArtist: req.body.albumArtist || "",
        contributingArtists: req.body.contributingArtists || "",
        coverArt: req.body.coverArt || "",
        playTime: req.body.playTime || "",
        year: req.body.year || "",
        user: req.body.user
      });
      const result = await album.save();
      if (result) {
        res.status(201).json({ message: "New album created", album: result });
      }
    } else {
      res.status(400).json({ message: "Request body cannot be empty" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server Error", error: err });
  }
};

const updateAlbum = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    const id = new ObjectId(req.params.id);
    const album = await Album.findOne({ _id: id });
    if (album) {
      album.name = req.body.name || album.name;
      album.albumArtist = req.body.albumArtist || album.albumArtist;
      album.playTime = req.body.playTime || album.playTime;
      album.contributingArtists = req.body.contributingArtists || album.contributingArtists;
      album.coverArt = req.body.coverArt || album.coverArt;
      album.year = req.body.year || album.year;
      const result = await album.save();
      if (result) {
        res.status(202).json({ message: "Updated album details", album: album });
      } else {
        res.status(404).json({ message: "Error saving album details" });
      }
    } else {
      res.status(202).json({ message: "No album found", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const deleteAlbum = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    const id = new ObjectId(req.params.id);
    const result = await Album.deleteOne({ _id: id });
    if (result) {
      if (result) {
        res.status(202).json({ message: "Deleted Album" });
      } else {
        res.status(404).json({ message: "Error deleting album" });
      }
    } else {
      res.status(202).json({ message: "No album found", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

module.exports = { getAlbum, getAlbums, createAlbum, updateAlbum, deleteAlbum };
