//import { User } from "../models/user_mode";
const User = require("../models/user_mode");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  console.log("login");
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return sendError(res, "bad email or password");
  }

  try {
    const user = await User.findOne({ email: email });
    if (user == null) {
      return sendError(res, "bad email or password");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return sendError(res, "bad email or password");
    }
    // Access Token:
    const accessToken = await jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET
      //{ expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );

    res.json({ accessToken: accessToken });
  } catch (err) {
    return sendError(res, err);
  }
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
    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
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
