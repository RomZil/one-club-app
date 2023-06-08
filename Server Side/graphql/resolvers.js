const Deal = require("../models/deal_model");
const User = require("../models/user_model");
const LoyaltyCard = require("../models/loyaltyCard_model");

module.exports = {
  Query: {
    async user(parent, { ID }, contextValue, info) {
      return await User.findById(ID);
    },
    async getDeals(parent, args, contextValue) {
      return await Deal.find();
    },
    async getLoyaltyCards(parent, { args }, contextValue, info) {
      return await LoyaltyCard.find();
    },
  },
  Mutation: {
    async createDeal(_, { dealInput: { title, description, imageURL, category } }) {
      const createdDeal = new Deal({
        title: title,
        description: description,
        imageURL: imageURL,
        category: category,
      });
      const res = await createdDeal.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteDeal(_, { ID }) {
      const isDeleted = (await Deal.deleteOne({ _id: ID })).deletedCount;
      return isDeleted;
    },
  },
};
