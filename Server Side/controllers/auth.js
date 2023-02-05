//import { User } from "../models/user_mode";
const User = require("../models/user_mode");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  console.log("login");
  res.status(400).send({
    status: "fail",
    message: "not implemented",
  });
};

const register = async (req, res, next) => {
  console.log("register");

  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return sendError(res);
  }

  // Check if the user not registered already
  try {
    user = await User.findOne({ email: email });
    if (user != null) {
      return sendError(res, "User already Registered");
    }
  } catch (err) {
    return sendError(res);
  }

  // Create new User
  try {
    let salt = await bcrypt.getSalt(10);
    let encryptedPassword = await bcrypt.hash(user.password, salt);
    const user = new User({
      email: email,
      password: encryptedPassword,
    });

    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (err) {
    return sendError(res, "Registeration failed");
  }
};

const logout = async (req, res, next) => {
  console.log("logout");
  res.status(400).send({
    status: "fail",
    message: "not implemented",
  });
};

function sendError(res, msg) {
  res.status(400).send({
    status: "fail",
    message: msg,
  });
}

module.exports = {
  login,
  register,
  logout,
};
