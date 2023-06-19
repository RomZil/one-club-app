const schedule = require("node-schedule");
const axios = require("axios");
const cheerio = require("cheerio");
const Deal = require("../../models/deal_model");
const LoyaltyCard = require("../../models/loyaltyCard_model");
const Category = require("../../models/category_model");

module.exports = schedule.scheduleJob("0 0 * * *", async function () {
  await deleteHapoalim();
  console.log("Start Running Hapoalim");
  await addHapoalim();
  console.log("Finish Running Hapoalim");
});

async function addHapoalim() {
  let loyaltyCard = await LoyaltyCard.findOne({ name: "בנק הפועלים" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "בנק הפועלים",
    });
    loyaltyCard = await loyaltyCard.save();
  }

  const links = ["Shopping", "Vacation-in", "movies", "Shows", "Fun", "Food-and-restaurants"];

  for (let i = 0; i < links.length; i++) {
    try {
      const response = await axios.get("https://www.bankhapoalim.co.il/he/Poalim-Wonder/" + links[i]);
      const html = response.data;

      const $ = cheerio.load(html);
      let array_benefits = [];
      let imageURLPrefix = "https://www.bankhapoalim.co.il";
      try {
        const benefits = $(".team-member");

        for (const benefit of benefits) {
          let benefit_title = $(benefit).find(".team-member-title").text();
          let benefit_description = $(benefit).find(".team-member-subtitle").text();
          let benefit_image =
            imageURLPrefix +
            $(benefit)
              .find(".team-member-img")
              .css("background-image")
              .replace(/.*\s?url\([\'\"]?/, "")
              .replace(/[\'\"]?\).*/, "");

          const deal = new Deal({
            title: benefit_title,
            description: benefit_description,
            category: new Category({ name: links[i] }),
            imageURL: benefit_image,
            loyaltyCardId: loyaltyCard,
          });

          await deal.save();

          array_benefits.push(array_benefits);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function deleteHapoalim() {
  console.log("Deleting Hapoalim");
  let loyaltyCard = await LoyaltyCard.findOne({ name: "בנק הפועלים" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "בנק הפועלים",
    });
    loyaltyCard = await loyaltyCard.save();
  }

  await Deal.deleteMany({ loyaltyCardId: loyaltyCard });
}
