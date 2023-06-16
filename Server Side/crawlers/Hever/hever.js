const schedule = require("node-schedule");
const axios = require("axios");
const Deal = require("../../models/deal_model");
const LoyaltyCard = require("../../models/loyaltyCard_model");
const Category = require("../../models/category_model");

const { spawn } = require("child_process");

module.exports = schedule.scheduleJob("*/10 * * * *", async function () {
  console.log("Delete Hever Yellow");
  await deleteHeverYellow();
  console.log("Delete Hever Blue");
  await deleteHeverBlue();

  console.log("Adding Hever Yellow");
  await AddHeverYellow();
  console.log("Adding Hever Blue");
  await AddHeverBlue();
  console.log("Finish Running Hever");
});

async function deleteHeverYellow() {
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

async function deleteHeverBlue() {
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר טעמים" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר טעמים",
    });
    await loyaltyCard.save();
  }

  await Deal.deleteMany({ loyaltyCardId: loyaltyCard });
}

async function AddHeverYellow() {
  const url = "https://www.hvr.co.il/bs2/datasets/giftcard.json";
  const imageURLStart = "https://www.hvr.co.il/pics/giftcard/";
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

async function AddHeverBlue() {
  const url = "https://www.hvr.co.il/bs2/datasets/teamimcard_branches.json";
  const imageURLStart = "https://www.hvr.co.il/img_hvr/Gift_card_teamim/";
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר טעמים" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר טעמים",
    });
    await loyaltyCard.save();
  }

  axios
    .get(url)
    .then(async (response) => {
      for (let i = 0; i < response.data.branch.length; i++) {
        const deal = new Deal({
          title: response.data.branch[i].name + " " + response.data.branch[i].city,
          description: "30% הנחה",
          category: new Category({ name: response.data.branch[i].type.split(",")[0] }),
          imageURL: imageURLStart + response.data.branch[i].img,
          loyaltyCardId: loyaltyCard,
        });

        await deal.save();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
