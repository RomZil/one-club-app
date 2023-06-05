const mongoose = require("mongoose");

const loyaltyCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dealId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
    },
});

module.exports = LoyaltyCard = mongoose.model("LoyaltyCard", loyaltyCardSchema);
