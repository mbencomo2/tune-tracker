const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  dateJoined: String,
  password: String,
  comment: String,
  faveGenre: String,
  year: String
});

const User = model("User", userSchema);

module.exports = User;
