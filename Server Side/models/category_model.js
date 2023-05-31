// import mongoose from "mongoose";
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aliases: {
    type: [String],
  },
});

module.exports = Category = mongoose.model("Category", categorySchema);
