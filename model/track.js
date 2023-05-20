const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const trackSchema = new Schema({
  title: String,
  album: String,
  albumArtist: String,
  artist: String,
  trackLength: String,
  trackNumber: String,
  coverArt: String,
  genre: String,
  user: String
});

const Track = model("Track", trackSchema);

module.exports = Track;
