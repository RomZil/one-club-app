const mongoose = require("mongoose");

const loyaltyCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = LoyaltyCard = mongoose.model("LoyaltyCard", loyaltyCardSchema);
