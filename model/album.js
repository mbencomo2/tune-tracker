const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const albumSchema = new Schema({
  name: String,
  albumArtist: String,
  playTime: Number,
  contributingArtists: String,
  coverArt: String,
  year: Number,
  userID: String
});

const Album = model("albums", albumSchema);

module.exports = Album;
