const User = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const getUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const result = await User.findById(req.id);
    if (result) {
      const userData = result.toObject();
      delete userData.password;
      res.status(202).json({ message: "Found user", user: userData });
    }
  } catch (err) {
    res.status(404).json({ message: "Error fetching users", error: `${err}` });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const emailExists = await checkEmail(req.body.email);
    if (emailExists) {
      newUser(req, res);
    } else {
      res.status(422).json({ error: { message: "Email already exists" } });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error creating user", error: `${err}` });
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const emailExists = await checkEmail(req.body.email);
    if (emailExists) {
      updUser(req, res);
    } else {
      res.status(422).json({ error: { message: "Email already exists" } });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: { message: "Error updating user" } });
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    User.findById(req.id).then((user) => {
      if (user) {
        User.deleteOne({ _id: req.id }).then(
          res.status(202).json({ message: "User deleted successfully" })
        );
      } else {
        res.status(202).json({ message: "User does not exist" });
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
        const token = createJWT(user.id);
        res.status(202).json({ message: "Login successful", token: token });
      } else {
        res.status(422).json({ message: "Wrong Username or Password" });
      }
    } else {
      res.status(422).json({ message: "Wrong Username or Password" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: { message: "Server error" } });
  }
};

const createJWT = (id) => {
  return jwt.sign({ id: id }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

const checkEmail = async (email) => {
  const result = await User.findOne({ email: email });
  if (result) {
    return false;
  } else {
    return true;
  }
};

const newUser = async (req, res) => {
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

      if (result.isModified()) {
        const userData = result.toObject();
        delete userData.password;
        res.status(201).json({ message: "User created successfully" });
      }
    });
  });
};

const updUser = async (req, res) => {
  const user = await User.findById(req.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.comment = req.body.comment || user.comment;
    if (req.body.password) {
      user.password = 
        await bcrypt
          .genSalt(saltRounds)
          .then(async (salt, err) => await bcrypt.hash(req.body.password, salt));
    }
    const result = await user.save();
    if (result) {
      const userData = result.toObject();
      delete userData.password;
      res.status(202).json({ message: "User updated successfully", user: userData });
    } else {
      res.status(422).json({ error: { message: "Could not update user info" } });
    }
  } else {
    res.status(422).json({ message: "Cannot find user" });
  }
};

module.exports = { getUser, createUser, updateUser, deleteUser, login };
