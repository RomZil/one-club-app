// import mongoose from "mongoose";
const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    data: Buffer,
  },
  category: {
    type: String,
    required: true,
  },
  loyaltyCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loyaltyCard_mode',
  }
});

module.exports = Deal = mongoose.model("Deal", dealSchema);
