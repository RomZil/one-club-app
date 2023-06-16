const Deal = require("../models/deal_model");
const User = require("../models/user_model");
const LoyaltyCard = require("../models/loyaltyCard_model");
const Category = require("../models/category_model");
const PopularCategories = require("../models/popular_categories");
const PopularDeals = require("../models/popular_deals");

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
    async getDealbyID(parent, { id }, contextValue) {
      return await Deal.findById(id).populate("loyaltyCardId").populate("category");
    },
    async getLoyaltyCards(parent, { args }, contextValue, info) {
      return await LoyaltyCard.find();
    },
    async getLoyaltyCardByUser(parent, { args }, contextValue, info) {
      return (await User.findById(contextValue._id)).loyaltyCardId;
    },
    async getDealsByUser(parent, { args }, contextValue, info) {
      let deals = [];
      let user = await User.findById(contextValue._id);
      let loyaltyCards = user.loyaltyCardId;

      for (let i = 0; i < loyaltyCards.length; i++) {
        let currLoyaltyCard = loyaltyCards[i];
        let currDeals = await Deal.find({ loyaltyCardId: currLoyaltyCard })
          .populate("loyaltyCardId")
          .populate("category");
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
    async getDealsByCategoryAndUser(parent, { categoryID }, contextValue, info) {
      let deals = [];
      let user = await User.findById(contextValue._id);
      let loyaltyCards = user.loyaltyCardId;

      for (let i = 0; i < loyaltyCards.length; i++) {
        let currLoyaltyCard = loyaltyCards[i];
        let currDeals = await Deal.find({ loyaltyCardId: currLoyaltyCard })
          .populate("loyaltyCardId")
          .populate("category");
        deals.push(...currDeals);
      }

      let dealsByCategory = [];
      for (let i = 0; i < deals.length; i++) {
        if (deals[i].category._id == categoryID) {
          dealsByCategory.push(deals[i]);
        }
      }

      return dealsByCategory;
    },
    async getPopularCategories(parent, { args }, contextValue, info) {
      let popularCategories = await PopularCategories.find({}).sort({ count: -1 }).limit(10);

      let popularCategoriesWithID = [];
      for (let i = 0; i < popularCategories.length; i++) {
        let category = await Category.findOne({ name: popularCategories[i].name });
        popularCategoriesWithID.push(category);
      }

      return popularCategoriesWithID;
    },
    async getPopularDeals(parent, { args }, contextValue, info) {
      let popularDeals = await PopularDeals.find({}).sort({ count: -1 }).limit(10);

      let popularDealsWithID = [];
      for (let i = 0; i < popularDeals.length; i++) {
        let deal = await Deal.findOne({ title: popularDealsWithID[i].name });
        popularDealsWithID.push(deal);
      }

      return popularDealsWithID;
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

    async updateUserLoyaltyCards(parent, { cards }, contextValue, info) {
      let user = await User.findById(contextValue._id);
      user.loyaltyCardId = [];
      for (let i = 0; i < cards.length; i++) {
        let currId = new mongoose.Types.ObjectId(cards[i].id);

        user.loyaltyCardId.push(currId);
      }

      return User.findByIdAndUpdate(user.id, user, { new: true });
    },

    async increasePopularCategory(parent, { categoryID }, contextValue, info) {
      let category = await Category.findById(categoryID);

      let popularCategory = await PopularCategories.findOne({ name: category.name });

      if (popularCategory == null || popularCategory == undefined) {
        popularCategory = new PopularCategories({ name: category.name, count: 1 });
        await popularCategory.save();
      } else {
        popularCategory.count = popularCategory.count + 1;
        await popularCategory.save();
      }

      return true;
    },

    async increasePopularDeal(parent, { dealID }, contextValue, info) {
      let deal = await Deal.findById(dealID);

      let popularDeal = await PopularDeals.findOne({ name: deal.title });

      if (popularDeal == null || popularDeal == undefined) {
        popularDeal = new PopularDeals({ name: deal.title, count: 1 });
        await popularDeal.save();
      } else {
        popularDeal.count = popularDeal.count + 1;
        await popularDeal.save();
      }

      return true;
    },
  },
};
