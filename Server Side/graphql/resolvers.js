const Deal = require("../models/deal_model");

module.exports = {
  Query: {
    async user(_, { ID }) {
      return await Deal.findById(ID);
    },
    async getDeals(_, { amount }) {
      return await Deal.find().limit(amount);
    },
  },
  Mutation: {
    async createDeal(_, deal) {
      const createdDeal = new Deal(deal);
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
