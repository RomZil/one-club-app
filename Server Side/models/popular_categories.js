const mongoose = require("mongoose");

const popularCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = Category = mongoose.model("PopularCategories", popularCategoriesSchema);
