// import mongoose from "mongoose";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: [String],
  },
  loyaltyCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoyaltyCard",
    // ref: 'loyaltyCard_mode',
  },
  // loyaltyCards: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "LoyaltyCard",
  //   },
  // ],
});

module.exports = User = mongoose.model("User", userSchema);
