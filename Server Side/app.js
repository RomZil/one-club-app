// Require
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config({ path: __dirname + "/config/.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const { ApolloServer } = require("apollo-server");
const app = express();
const port = process.env.port;
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Cron jobs
require("./crawlers/tasks");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors("*"));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
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

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Routes
const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);

// Routes
const postRouter = require("./routes/post_routes");
app.use("/post", postRouter);

const Deal = require("./models/deal_model");
const LoyaltyCard = require("./models/loyaltyCard_model");
const Category = require("./models/category_model");

app.get("/test", async (req, res, next) => {
  let loyaltyCard = await LoyaltyCard.findOne({ name: "חבר צהוב" });

  const deal = new Deal({
    title: "Test",
    description: "Test",
    catrgory: new Category({ name: "חשמל ואלקטרוניקה" }),
    imageURL: "",
    loyaltyCard: loyaltyCard,
  });

  deal.save();

  res.send("Test");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
