const Deal = require("../models/deal_model");
const User = require("../models/user_model");

module.exports = {
  Query: {
    async user(_, { ID }) {
      return await User.findById(ID);
    },
    async getDeals(_, { amount }) {
      return await Deal.find().limit(amount);
    },
  },
  Mutation: {
    async createDeal(
      _,
      { dealInput: { title, description, imageURL, catrgory } }
    ) {
      const createdDeal = new Deal({
        title: title,
        description: description,
        imageURL: imageURL,
        catrgory: catrgory,
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
