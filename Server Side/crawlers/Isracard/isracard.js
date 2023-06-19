const schedule = require("node-schedule");
const axios = require("axios");
const cheerio = require("cheerio");
const Deal = require("../../models/deal_model");
const LoyaltyCard = require("../../models/loyaltyCard_model");
const Category = require("../../models/category_model");

const loyaltyCardNameHebrew = "ישראכרט";
const loyaltyCardNameEnglish = "Isracard";

module.exports = schedule.scheduleJob("0 0 * * *", async function () {
  await deleteIsracard();
  console.log("Start Running " + loyaltyCardNameEnglish);
  await addIsracard();
  console.log("Finish Running " + loyaltyCardNameEnglish);
});

async function addIsracard() {
  let loyaltyCard = await LoyaltyCard.findOne({ name: loyaltyCardNameHebrew });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: loyaltyCardNameHebrew,
    });
    loyaltyCard = await loyaltyCard.save();
  }

  const links = ["attractions", "cinema", "parents", "art", "travels"];
  let array_benefits = [];
  for (let i = 0; i < links.length; i++) {
    try {
      const response = await axios.get("https://benefits.isracard.co.il/parentcategories/" + links[i]);
      const html = response.data;

      const $ = cheerio.load(html);

      let imageURLPrefix = "https://benefits.isracard.co.il";
      try {
        const benefits = $(".category-featured-benefit");

        for (const benefit of benefits) {
          let benefit_description = $(benefit).find(".caption-title").text();
          let benefit_title = $(benefit).find(".caption-sub-title").text();
          let benefit_image =
            imageURLPrefix +
            $(benefit)
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
  console.log(loyaltyCardNameEnglish + " - Added -" + array_benefits.length);
}

async function deleteIsracard() {
  console.log("Deleting " + loyaltyCardNameEnglish);
  let loyaltyCard = await LoyaltyCard.findOne({ name: loyaltyCardNameHebrew });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: loyaltyCardNameHebrew,
    });
    loyaltyCard = await loyaltyCard.save();
  }
  let x = await Deal.find({ loyaltyCardId: loyaltyCard });

  await Deal.deleteMany({ loyaltyCardId: loyaltyCard });
}
