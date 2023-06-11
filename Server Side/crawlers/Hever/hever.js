const schedule = require("node-schedule");
const axios = require("axios");
const Deal = require("../../models/deal_model");
const LoyaltyCard = require("../../models/loyaltyCard_model");
const Category = require("../../models/category_model");

const { spawn } = require("child_process");

module.exports = schedule.scheduleJob("* * * * *", async function () {
  await deleteHeverYellow();
  await deleteHeverBlue();

  console.log("Start Running Hever");
  await AddHeverYellow();
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

async function AddHeverYellow() {
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

async function deleteHeverBlue() {
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר טעמים" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר טעמים",
    });
    await loyaltyCard.save();
  }

  await Deal.deleteMany({ loyaltyCard: loyaltyCard });
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
      for (let i = 0; i < response.data.length; i++) {
        const deal = new Deal({
          title: response.data[i].name + " " + response.data[i].city,
          description: "30% הנחה",
          catergory: new Category({ name: response.data[i].type }),
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
