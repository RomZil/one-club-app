const schedule = require("node-schedule");
const axios = require("axios");
const Deal = require("../../models/deal_model");
const LoyaltyCard = require("../../models/loyaltyCard_model");
const { spawn } = require("child_process");

module.exports = schedule.scheduleJob("* * * * *", async function () {
  // console.log("Start Running Hever");
  // await AddHeverYellow();
  // console.log("Finish Running Hever");
  console.log("starts");
  const python = spawn("python", ["./../Scrapers/Banks/Hapoalim/main.py"]);
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    let str = data.toString();
    console.log(JSON.parse(str));
  });
});

// module.exports = schedule.scheduleJob("* * * * *", function () {
//   console.log("The answer to life, the universe, and everything!");
// });

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
  await Deal.deleteMany({ loyaltyCard: loyaltyCard });
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
  await deleteHeverYellow();

  axios
    .get(url)
    .then((response) => {
      //console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        const deal = new Deal({
          title: response.data[i].company,
          description: "30% הנחה",
          catrgory: response.data[i].company_category,
          imageURL: imageURLStart + response.data[i].logo,
          loyaltyCard: loyaltyCard,
        });

        deal.save();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
