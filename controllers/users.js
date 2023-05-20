const User = require("../model/user");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const id = new ObjectId(req.params.id);
    const result = await User.findById(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(404).json({ message: "Error fetching users", error: `${err}` });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const date = new Date();
    const plainPassword = req.body.password;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(plainPassword, salt, async (err, hash) => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          dateJoined: date,
          password: hash,
          faveGenre: req.body.favGenre || "",
          comment: req.body.comment || ""
        });
        const result = await user.save();
        if (result) {
          const userData = result.toObject();
          delete userData.password;
          res.status(201).json({ message: "User created successfully", user: userData });
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error creating user", error: `${err}` });
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const id = new ObjectId(req.params.id);
    const user = await User.findOne({ _id: id });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.comment = req.body.comment || user.comment;
      const result = await user.save();
      if (result) {
        const userData = result.toObject();
        delete userData.password;
        res.status(201).json({ message: "User updated successfully", user: userData });
      }
    } else {
      res.status(202).json({ message: `No user exists for ${id}` });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error updating user", error: `${err}` });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const id = new ObjectId(req.params.id);
    User.findOne({ _id: id }).then((user) => {
      if (user) {
        User.deleteOne({ _id: id }).then(
          res.status(202).json({ message: "User deleted successfully" })
        );
      } else {
        res.status(202).json({ message: `No user exists for ${id}` });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error deleting user", error: `${err}` });
  }
};

const login = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const password = req.body.password;
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const userData = {
          _id: user.id,
          name: user.name,
          email: user.email,
          dateJoined: user.dateJoined,
          comment: user.comment,
          favGenre: user.faveGenre
        };
        res.status(202).json({ message: "Login successful", data: userData });
      } else {
        res.status(202).json({ message: "Wrong Username or Password", error: "Failed to login" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error getting user info", error: err });
  }
};

module.exports = { getUser, createUser, updateUser, deleteUser, login };
