const mongoose = require("mongoose");
const Category = require("./category_model");

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageURL: {
    type: String,
  },
<<<<<<< HEAD
  category: {
=======
  catergory: {
>>>>>>> origin/GraphQL
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  loyaltyCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoyaltyCard",
  },
});

dealSchema.pre("save", async function (next) {
  let deal = this;
<<<<<<< HEAD
  let category = deal.category.name;
=======
  let category = deal.catergory.name;
>>>>>>> origin/GraphQL
  let categoryObj = await Category.findOne({ name: category });

  if (categoryObj == null) {
    let aliases = [];
    aliases.push(category);
    if (hasWhiteSpace(category)) {
      let wordsCategory = category.split(" ");
      for (let i = 1; i < wordsCategory.length; i++) {
        if (wordsCategory[i].charAt(0) === "ו") {
          wordsCategory[i] = wordsCategory[i].substring(1);
        }
      }

      aliases.push(...wordsCategory);
    }
    categoryObj = new Category({
      name: category,
      aliases: aliases,
    });
    let savedCategory = await categoryObj.save();
<<<<<<< HEAD
    deal.category = savedCategory;
=======
    deal.catergory = savedCategory;
>>>>>>> origin/GraphQL
  }
  next();
});

module.exports = Deal = mongoose.model("Deal", dealSchema);

function hasWhiteSpace(s) {
  return s.indexOf(" ") >= 0;
}
