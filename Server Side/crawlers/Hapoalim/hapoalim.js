const schedule = require("node-schedule");
const axios = require("axios");
const Deal = require("../../models/deal_model");
const LoyaltyCard = require("../../models/loyaltyCard_model");
const { spawn } = require("child_process");

module.exports = schedule.scheduleJob("* * * * *", async function () {
  await deleteHapoalim();
  console.log("Start Running Hever");
  await addHapoalim();
  console.log("Finish Running Hever");
});

async function addHapoalim() {
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר צהוב" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר צהוב",
    });
    await loyaltyCard.save();
  }
  console.log("starts");
  const python = spawn("python", ["./../Scrapers/Banks/Hapoalim/main.py"]);
  python.stdout.on("data", async function (data) {
    console.log("Pipe data from python script ...");
    let str = data.toString();
    // console.log(JSON.parse(str));
    let dataFromJson = JSON.parse(str);

    for (let i = 0; i < dataFromJson.length; i++) {
      const deal = new Deal({
        title: dataFromJson[i].title,
        description: dataFromJson.desc,
        catrgory: new Category({ name: "קולנוע" }),
        imageURL: "",
        loyaltyCard: loyaltyCard,
      });

      console.log(deal.title);
      await deal.save();
    }
  });
}

async function deleteHapoalim() {
  console.log("Deleting Hapoalim");
  let loyaltyCard = await LoyaltyCard.findOne({ name: "בנק הפועלים" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "בנק הפועלים",
    });
    await loyaltyCard.save();
  }

  await Deal.deleteMany({ loyaltyCard: loyaltyCard });
}
