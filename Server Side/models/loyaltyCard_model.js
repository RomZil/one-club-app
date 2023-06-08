const mongoose = require("mongoose");

const loyaltyCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deal: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
    },
  ],
});

module.exports = LoyaltyCard = mongoose.model("LoyaltyCard", loyaltyCardSchema);
