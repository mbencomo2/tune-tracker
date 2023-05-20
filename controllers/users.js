const User = require("../model/user");
const ObjectId = require("mongodb").ObjectId;

const getUser = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await User.findById(id);
    res.status(202).json(result);
  } catch (err) {
    res.status(404).json({ message: "Error fetching users", error: `${err}` });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    user.save().then((user) => {
      res.status(201).json({ message: "User created successfully", user: user });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error creating user", error: `${err}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    User.findOne({ _id: id }).then((user) => {
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        User.updateOne({ _id: id }, user).then((user) => {
          res.status(201).json({ message: "User updated successfully", user: user });
        });
      } else {
        res.status(202).json({ message: `No user exists for ${id}` });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error updating user", error: `${err}` });
  }
};

const deleteUser = async (req, res) => {
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

module.exports = { getUser, createUser, updateUser, deleteUser };
