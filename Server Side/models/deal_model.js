const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  catrgory: {
    type: String,
  },
});

module.exports = Deal = mongoose.model("Deal", dealSchema);
