const schedule = require("node-schedule");
const axios = require("axios");
const Deal = require("../../models/deal_model");
const LoyaltyCard = require("../../models/loyaltyCard_model");
const Category = require("../../models/category_model");

const { spawn } = require("child_process");

module.exports = schedule.scheduleJob("*/10 * * * *", async function () {
  await deleteHeverYellow();

  console.log("Start Running Hever");
  await AddHeverYellow();
  console.log("Finish Running Hever");
});

async function deleteHeverYellow() {
  console.log("Deleting Hever");
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר צהוב" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר צהוב",
    });
    await loyaltyCard.save();
  }

  //let dealsHever = await Deal.find({ loyaltyCard: loyaltyCard });
  await Deal.deleteMany({ loyaltyCardId: loyaltyCard });
}

async function AddHeverYellow() {
  console.log("Add Hever");
  const url = "https://www.hvr.co.il/bs2/datasets/giftcard.json";
  const imageURLStart = "https://www.hvr.co.il/pics/site_home/";
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר צהוב" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר צהוב",
    });
    await loyaltyCard.save();
  }

  axios
    .get(url)
    .then(async (response) => {
      console.log(response.data.length);
      for (let i = 0; i < response.data.length; i++) {
        const deal = new Deal({
          title: response.data[i].company,
          description: "30% הנחה",
          category: new Category({ name: response.data[i].company_category }),
          imageURL: imageURLStart + response.data[i].logo,
          loyaltyCardId: loyaltyCard,
        });

        await deal.save();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
