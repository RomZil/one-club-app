// Require
const express = require("express");
const dotenv = require("dotenv").config({ path: __dirname + "/config/.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const axios = require("axios");
const Deal = require("./models/deal_model");
const LoyaltyCard = require("./models/loyaltyCard_model");

const app = express();
const port = process.env.port;
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to MongoDB");
  server.listen({ port: 5000 }).then((res) => {
    console.log("Server running at " + res.url);
  });
});

// Routes
const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);

// Routes
const postRouter = require("./routes/post_routes");
app.use("/post", postRouter);

app.get("/hever", async (req, res) => {
  const url = "https://www.hvr.co.il/bs2/datasets/giftcard.json";
  const imageURLStart = "https://www.hvr.co.il/pics/site_home/";
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר צהוב" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר צהוב",
    });
    await loyaltyCard.save();
  }
  await deleteHever();

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
  res.send("Hello World!");
});

//app.get("/delete", async (req, res) => {});

const deleteHever = async () => {
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר צהוב" });
  if (loyaltyCard == null) {
    loyaltyCard = new LoyaltyCard({
      name: "חבר צהוב",
    });
    await loyaltyCard.save();
  }

  //let dealsHever = await Deal.find({ loyaltyCard: loyaltyCard });
  await Deal.deleteMany({ loyaltyCard: loyaltyCard });
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
