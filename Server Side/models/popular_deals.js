const mongoose = require("mongoose");

const popularDealsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = Category = mongoose.model("PopularDeals", popularDealsSchema);
