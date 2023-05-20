const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const albumSchema = new Schema({
  name: String,
  albumArtist: String,
  playTime: String,
  contributingArtists: String,
  coverArt: String,
  year: String,
  user: String
});

const Album = model("albums", albumSchema);

module.exports = Album;
