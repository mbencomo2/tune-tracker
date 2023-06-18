const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const trackSchema = new Schema({
  title: String,
  albumID: String,
  albumArtist: String,
  artist: String,
  trackLength: Number,
  trackNumber: Number,
  coverArt: String,
  genre: String,
  userID: String
});

const Track = model("Track", trackSchema);

module.exports = Track;
