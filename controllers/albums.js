const Album = require("../model/album");
const ObjectId = require("mongodb").ObjectId;

const getAlbums = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    const result = await Album.find({ userID: req.id });
    if (result) {
      const data = result.map((album) => {
        const withoutUser = album.toObject();
        delete withoutUser.userID;
        return withoutUser;
      });
      res.status(202).json({ message: "Fetched all albums", albums: data });
    } else {
      res.status(202).json({ message: "No Albums for current user" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const getAlbum = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    const id = new ObjectId(req.params.albumId);
    const result = await Album.findOne({ _id: id });
    if (result) {
      const data = result.toObject();
      delete data.userID;
      res.status(202).json({ message: "Fetched album details", album: data });
    } else {
      res.status(202).json({ message: "No album found" });
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
        name: req.body.name,
        albumArtist: req.body.albumArtist || "",
        contributingArtists: req.body.contributingArtists || "",
        coverArt: req.body.coverArt || "",
        playTime: req.body.playTime || "",
        year: req.body.year || "",
        userID: req.id
      });
      const result = await album.save();
      if (result) {
        const data = result.toObject();
        delete data.userID;
        res.status(201).json({ message: "New album created", album: data });
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
    const id = new ObjectId(req.params.albumId);
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
        const data = album.toObject();
        delete data.userID;
        res.status(202).json({ message: "Updated album details", album: data });
      } else {
        res.status(422).json({ message: "Error saving album details" });
      }
    } else {
      res.status(404).json({ message: "No album found"});
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

const deleteAlbum = async (req, res) => {
  // #swagger.tags = ['Albums']
  try {
    const id = new ObjectId(req.params.albumId);
    const result = await Album.deleteOne({ _id: id });
    if (result) {
      res.status(202).json({ message: "Deleted Album" });
    } else {
      res.status(202).json({ message: "No album found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error", error: err });
  }
};

module.exports = { getAlbum, getAlbums, createAlbum, updateAlbum, deleteAlbum };
