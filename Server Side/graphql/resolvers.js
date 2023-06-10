const Deal = require("../models/deal_model");
const User = require("../models/user_model");
const LoyaltyCard = require("../models/loyaltyCard_model");
const Category = require("../models/category_model");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");

module.exports = {
  Query: {
    async getUser(parent, args, contextValue, info) {
      let x = await User.findById(contextValue._id).populate({ path: "loyaltyCardId" });
      return x;
    },
    async getDeals(parent, args, contextValue) {
      return await Deal.find().populate("loyaltyCardId").populate("category");
    },
    async getDealbyID(parent, { ID }, contextValue) {
      return await Deal.findById(ID).populate("loyaltyCardId").populate("category");
    },
    async getLoyaltyCards(parent, { args }, contextValue, info) {
      return await LoyaltyCard.find();
    },
    async getLoyaltyCardByUser(parent, { args }, contextValue, info) {
      return (await User.findById(contextValue._id)).loyaltyCardId;
    },
    async getDealsByUser(parent, { args }, contextValue, info) {
      let deals = [];
      let loyaltyCards = await User.findById(contextValue._id).loyaltyCardId;

      for (let i = 0; i < loyaltyCards.length; i++) {
        let currLoyaltyCard = loyaltyCards[i];
        let currDeals = await Deal.find({ loyaltyCardId: currLoyaltyCard });
        deals.push(...currDeals);
      }

      return deals;
    },
    async getDealsByCategory(parent, { categoryID }, contextValue, info) {
      return await Deal.find({ category: categoryID });
    },
    async getCategories(parent, args, contextValue) {
      return await Category.find();
    },
    async getCategoriesByUser(parent, { args }, contextValue, info) {
      let deals = [];
      let user = await User.findById(contextValue._id);
      let loyaltyCards = user.loyaltyCardId;

      for (let i = 0; i < loyaltyCards.length; i++) {
        let currLoyaltyCard = loyaltyCards[i];
        let currDeals = await Deal.find({ loyaltyCardId: currLoyaltyCard });
        deals.push(...currDeals);
      }

      const categories = new Set();
      for (let i = 0; i < deals.length; i++) {
        let str = JSON.stringify(deals[i].category);
        let result = str.slice(1, -1);
        categories.add(result);
      }

      let arrCategories = Array.from(categories);
      let categoriesToReturn = [];
      for (let i = 0; i < arrCategories.length; i++) {
        categoriesToReturn[i] = await Category.findById(arrCategories[i]);
      }

      return categoriesToReturn;
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

    async updateUserFields(parent, { userUpdateInput: { name, email, password } }, contextValue, info) {
      let user = await User.findById(contextValue._id);
      if (name != undefined) {
        user.name = name;
      }
      if (email != undefined) {
        user.email = email;
      }
      if (password != undefined) {
        let salt = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(password, salt);

        user.password = encryptedPassword;
      }

      return User.findByIdAndUpdate(user.id, user, { new: true });
    },
    async updateUserLoyaltyCards(parent, { loyaltyCards }, contextValue, info) {
      let user = await User.findById(contextValue._id);
      user.loyaltyCardId = [];
      for (let i = 0; i < loyaltyCards.length; i++) {
        let currId = new mongoose.Types.ObjectId(loyaltyCards[i].id);

        user.loyaltyCardId.push(currId);
      }

      return User.findByIdAndUpdate(user.id, user, { new: true });
    },
  },
};
