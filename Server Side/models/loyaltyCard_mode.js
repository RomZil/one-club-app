const mongoose = require("mongoose");

const loyalCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = LoyalCard = mongoose.model("LoyalCard", loyalCardSchema);
